import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Upload, 
  Database, 
  Image, 
  Brain, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Loader2,
  BarChart3,
  Eye
} from 'lucide-react';

type InputType = 'data' | 'image' | 'both';
type StepType = 1 | 2 | 3;

interface TabularData {
  radius_mean: string;
  texture_mean: string;
  perimeter_mean: string;
  area_mean: string;
  smoothness_mean: string;
}

interface Results {
  prediction: 'Malignant' | 'Benign';
  fusedProbability: number;
  imageProbability?: number;
  dataProbability?: number;
  gradCamUrl?: string;
  shapFeatures?: Array<{
    feature: string;
    importance: number;
    type: 'positive' | 'negative';
  }>;
}

export function ProductTesting() {
  const [step, setStep] = useState<StepType>(1);
  const [inputType, setInputType] = useState<InputType>('data');
  const [tabularData, setTabularData] = useState<TabularData>({
    radius_mean: '',
    texture_mean: '',
    perimeter_mean: '',
    area_mean: '',
    smoothness_mean: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [fusionWeight, setFusionWeight] = useState(50);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<Results | null>(null);
  const [error, setError] = useState<string>('');

  const inputTypes = [
    { value: 'data' as const, label: 'Clinical Data', icon: <Database className="h-5 w-5" /> },
    { value: 'image' as const, label: 'Medical Image', icon: <Image className="h-5 w-5" /> },
    { value: 'both' as const, label: 'Both', icon: <Brain className="h-5 w-5" /> },
  ];

  const tabularFields = [
    { key: 'radius_mean' as keyof TabularData, label: 'Radius Mean', placeholder: '14.5' },
    { key: 'texture_mean' as keyof TabularData, label: 'Texture Mean', placeholder: '19.2' },
    { key: 'perimeter_mean' as keyof TabularData, label: 'Perimeter Mean', placeholder: '92.3' },
    { key: 'area_mean' as keyof TabularData, label: 'Area Mean', placeholder: '654.9' },
    { key: 'smoothness_mean' as keyof TabularData, label: 'Smoothness Mean', placeholder: '0.096' },
  ];

  const handleInputTypeChange = (type: InputType) => {
    setInputType(type);
    setImageFile(null);
    setTabularData({
      radius_mean: '',
      texture_mean: '',
      perimeter_mean: '',
      area_mean: '',
      smoothness_mean: ''
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
    }
  };

  const canProceedToStep2 = inputType !== null;
  const canProceedToStep3 = () => {
    if (inputType === 'data') {
      return Object.values(tabularData).every(value => value.trim() !== '');
    } else if (inputType === 'image') {
      return imageFile !== null;
    } else if (inputType === 'both') {
      return Object.values(tabularData).every(value => value.trim() !== '') && imageFile !== null;
    }
    return false;
  };

  const callBackendAPI = async () => {
    setIsLoading(true);
    setProgress(0);
    setError('');

    try {
      // Simulate progress updates while waiting for backend
      const intervals = [20, 40, 60, 80, 100];
      for (const targetProgress of intervals) {
        await new Promise(resolve => setTimeout(resolve, 500));
        setProgress(targetProgress);
      }

      let responseData: any;

      if (inputType === 'image' && imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);

        const response = await fetch("http://localhost:8000/predict", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Backend error while processing image.");
        }

        responseData = await response.json();
      } else {
        throw new Error("Only image input is supported right now.");
      }

      const apiResults: Results = {
        prediction: responseData.prediction,
        fusedProbability: responseData.probability,
        imageProbability: responseData.probability,
        gradCamUrl: undefined,
        shapFeatures: undefined,
        dataProbability: undefined,
      };

      setResults(apiResults);
    } catch (err) {
      setError('Failed to process your request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setInputType('data');
    setTabularData({
      radius_mean: '',
      texture_mean: '',
      perimeter_mean: '',
      area_mean: '',
      smoothness_mean: ''
    });
    setImageFile(null);
    setFusionWeight(50);
    setResults(null);
    setError('');
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="font-playfair text-4xl font-bold text-foreground mb-4">
            Product Testing
          </h1>
          <p className="text-lg text-muted-foreground">
            Test our multimodal cancer prediction system with your data
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!results ? (
            <motion.div
              key="wizard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <CardTitle>Step {step} of 3</CardTitle>
                    <div className="flex space-x-2">
                      {[1, 2, 3].map((s) => (
                        <div
                          key={s}
                          className={`h-2 w-8 rounded-full ${
                            s <= step ? 'bg-primary' : 'bg-muted'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {step === 1 && (
                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <h3 className="text-xl font-semibold mb-6">Choose Input Type</h3>
                      <div className="grid gap-4 md:grid-cols-3">
                        {inputTypes.map((type) => (
                          <button
                            key={type.value}
                            onClick={() => handleInputTypeChange(type.value)}
                            className={`p-6 rounded-2xl border-2 transition-all ${
                              inputType === type.value
                                ? 'border-primary bg-primary/10'
                                : 'border-muted hover:border-primary/50'
                            }`}
                          >
                            <div className="flex flex-col items-center space-y-3">
                              {type.icon}
                              <span className="font-medium">{type.label}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                      
                      <div className="mt-8 flex justify-end">
                        <Button
                          onClick={() => setStep(2)}
                          disabled={!canProceedToStep2}
                        >
                          Next
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <h3 className="text-xl font-semibold mb-6">Upload Your Data</h3>
                      
                      <div className="space-y-6">
                        {(inputType === 'data' || inputType === 'both') && (
                          <div className="space-y-4">
                            <h4 className="font-medium flex items-center">
                              <Database className="h-5 w-5 mr-2" />
                              Clinical Data
                            </h4>
                            <div className="grid gap-4 md:grid-cols-2">
                              {tabularFields.map((field) => (
                                <div key={field.key}>
                                  <Label htmlFor={field.key}>{field.label}</Label>
                                  <Input
                                    id={field.key}
                                    type="number"
                                    step="0.01"
                                    placeholder={field.placeholder}
                                    value={tabularData[field.key]}
                                    onChange={(e: { target: { value: any; }; }) =>
                                      setTabularData(prev => ({
                                        ...prev,
                                        [field.key]: e.target.value
                                      }))
                                    }
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {(inputType === 'image' || inputType === 'both') && (
                          <div className="space-y-4">
                            <h4 className="font-medium flex items-center">
                              <Image className="h-5 w-5 mr-2" />
                              Medical Image
                            </h4>
                            <div className="border-2 border-dashed border-muted rounded-2xl p-8 text-center">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                                id="image-upload"
                              />
                              <label htmlFor="image-upload" className="cursor-pointer">
                                <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                                <p className="text-lg font-medium mb-2">
                                  {imageFile ? imageFile.name : 'Drop image here or click to browse'}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Supports JPG, PNG, DICOM formats
                                </p>
                              </label>
                              {imageFile && (
                                <div className="mt-4">
                                  <img
                                    src={URL.createObjectURL(imageFile)}
                                    alt="Preview"
                                    className="h-32 w-32 mx-auto rounded-xl object-cover"
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {inputType === 'both' && (
                          <div className="space-y-4">
                            <h4 className="font-medium">Fusion Weight</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Favor Clinical Data</span>
                                <span>{fusionWeight}%</span>
                                <span>Favor Image</span>
                              </div>
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={fusionWeight}
                                onChange={(e) => setFusionWeight(Number(e.target.value))}
                                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="mt-8 flex justify-between">
                        <Button variant="outline" onClick={() => setStep(1)}>
                          Back
                        </Button>
                        <Button
                          onClick={() => setStep(3)}
                          disabled={!canProceedToStep3()}
                        >
                          Next
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <h3 className="text-xl font-semibold mb-6">Run Analysis</h3>
                      
                      <div className="space-y-6">
                        <div className="bg-muted/50 rounded-2xl p-6">
                          <h4 className="font-medium mb-4">Analysis Summary</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Input Type:</span>
                              <Badge variant="secondary">
                                {inputTypes.find(t => t.value === inputType)?.label}
                              </Badge>
                            </div>
                            {inputType === 'both' && (
                              <div className="flex justify-between">
                                <span>Fusion Weight:</span>
                                <span>{fusionWeight}%</span>
                              </div>
                            )}
                            {imageFile && (
                              <div className="flex justify-between">
                                <span>Image File:</span>
                                <span className="truncate max-w-48">{imageFile.name}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {isLoading && (
                          <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                              <Loader2 className="h-5 w-5 animate-spin" />
                              <span>Processing your data...</span>
                            </div>
                            <Progress value={progress} className="w-full" />
                          </div>
                        )}

                        {error && (
                          <Alert variant="destructive">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                          </Alert>
                        )}
                      </div>

                      <div className="mt-8 flex justify-between">
                        <Button variant="outline" onClick={() => setStep(2)}>
                          Back
                        </Button>
                        <Button
                          onClick={callBackendAPI}
                          disabled={isLoading}
                          className="min-w-32"
                        >
                          {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          ) : null}
                          {isLoading ? 'Running...' : 'Run Test'}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                    Analysis Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Prediction Result */}
                  <div className="text-center p-6 bg-muted/30 rounded-2xl">
                    <Badge 
                      variant={results.prediction === 'Healthy' ? 'success' : 'destructive'}
                      className="text-lg px-4 py-2 mb-4"
                    >
                      {results.prediction}
                    </Badge>
                    <div className="text-3xl font-bold text-accent">
                      {results.fusedProbability}% Confidence
                    </div>
                  </div>

                  {/* Individual Predictions */}
                  {(results.imageProbability || results.dataProbability) && (
                    <div className="grid gap-4 md:grid-cols-2">
                      {results.imageProbability && (
                        <div className="p-4 border rounded-2xl">
                          <div className="flex items-center mb-2">
                            <Image className="h-5 w-5 mr-2" />
                            <span className="font-medium">Image-only</span>
                          </div>
                          <div className="text-2xl font-bold text-accent">
                            {results.imageProbability}%
                          </div>
                        </div>
                      )}
                      {results.dataProbability && (
                        <div className="p-4 border rounded-2xl">
                          <div className="flex items-center mb-2">
                            <Database className="h-5 w-5 mr-2" />
                            <span className="font-medium">Data-only</span>
                          </div>
                          <div className="text-2xl font-bold text-accent">
                            {results.dataProbability}%
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Grad-CAM */}
                  {results.gradCamUrl && (
                    <div>
                      <h4 className="font-medium flex items-center mb-4">
                        <Eye className="h-5 w-5 mr-2" />
                        Grad-CAM Heatmap
                      </h4>
                      <div className="relative">
                        <img
                          src={results.gradCamUrl}
                          alt="Grad-CAM visualization"
                          className="w-full max-w-md mx-auto rounded-2xl"
                        />
                        <div className="text-sm text-muted-foreground text-center mt-2">
                          Red areas indicate regions contributing to the prediction
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SHAP Features */}
                  {results.shapFeatures && (
                    <div>
                      <h4 className="font-medium flex items-center mb-4">
                        <BarChart3 className="h-5 w-5 mr-2" />
                        Feature Importance (SHAP)
                      </h4>
                      <div className="space-y-2">
                        {results.shapFeatures.map((feature, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="font-medium">{feature.feature}</span>
                            <div className="flex items-center space-x-2">
                              <Badge variant={feature.type === 'positive' ? 'success' : 'warning'}>
                                {feature.type === 'positive' ? '+' : '-'}{Math.abs(feature.importance).toFixed(2)}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Warning */}
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Research demo only</strong> — This tool is not intended for medical diagnosis 
                      or clinical decision-making. Always consult healthcare professionals for medical advice.
                    </AlertDescription>
                  </Alert>

                  <div className="flex justify-center">
                    <Button onClick={resetForm} size="lg">
                      Run Another Test
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
