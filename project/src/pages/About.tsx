import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Target, 
  Brain, 
  Shield, 
  AlertTriangle, 
  Lock, 
  Database,
  Image,
  Zap,
  Eye,
  Clock
} from 'lucide-react';

export function About() {
  const sections = [
    {
      icon: <Target className="h-6 w-6 text-accent" />,
      title: "Our Mission",
      content: "We aim to democratize multimodal cancer research tools, making advanced AI-powered analysis accessible to researchers and clinicians. Starting with colon cancer detection, we're building a platform that combines the power of clinical data and medical imaging."
    },
    {
      icon: <Brain className="h-6 w-6 text-accent" />,
      title: "Technology",
      content: "Our system employs dual neural networks for tabular and image data, using late fusion techniques to combine predictions. We provide explainability through Grad-CAM heatmaps for images and SHAP feature importance for clinical data, ensuring transparency in AI decision-making."
    },
    {
      icon: <Shield className="h-6 w-6 text-accent" />,
      title: "Cloud Infrastructure", 
      content: "Built on AWS S3 with presigned URLs for secure file upload, our infrastructure ensures data privacy with encryption at rest. All uploads are automatically deleted within 24 hours, and prediction results are purged after 7 days."
    },
    {
      icon: <AlertTriangle className="h-6 w-6 text-accent" />,
      title: "Limitations",
      content: "This is a research demonstration only, not intended for medical diagnosis. Our models may exhibit dataset bias and should not replace professional medical judgment. All predictions are for research and educational purposes."
    },
    {
      icon: <Lock className="h-6 w-6 text-accent" />,
      title: "Privacy & Security",
      content: "Do not upload protected health information (PHI) or personally identifiable data. All uploads use temporary storage with automatic cleanup. We implement industry-standard security practices but cannot guarantee absolute data protection."
    }
  ];

  const techFeatures = [
    {
      icon: <Database className="h-5 w-5" />,
      title: "Tabular Data Processing",
      description: "Neural networks trained on clinical features like radius, texture, perimeter, area, and smoothness measurements."
    },
    {
      icon: <Image className="h-5 w-5" />,
      title: "Medical Imaging Analysis", 
      description: "Convolutional neural networks for processing medical images with specialized architectures for cancer detection."
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Late Fusion",
      description: "Advanced ensemble methods that combine predictions from multiple modalities with configurable weighting."
    },
    {
      icon: <Eye className="h-5 w-5" />,
      title: "Explainable AI",
      description: "Grad-CAM visualizations and SHAP feature attributions to understand model decision-making processes."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-playfair text-4xl font-bold text-foreground mb-4">
            About semicolon
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Advancing multimodal cancer research through accessible AI tools and transparent methodology
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      {section.icon}
                      <span>{section.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {section.content}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Technical Features */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Technical Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {techFeatures.map((feature, index) => (
                    <div key={index} className="flex space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
                          {feature.icon}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{feature.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Key Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Security & Privacy</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Data Retention</span>
                    <Badge variant="outline" className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>24h max</span>
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Encryption</span>
                    <Badge variant="outline">At Rest</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Upload Method</span>
                    <Badge variant="outline">Presigned URLs</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Access Control</span>
                    <Badge variant="outline">Private Bucket</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
                <CardContent className="pt-6">
                  <h3 className="font-playfair text-lg font-semibold mb-3">
                    Research Collaboration
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Interested in collaborating or have questions about our methodology? 
                    We welcome discussions with researchers and healthcare professionals.
                  </p>
                  <Badge variant="secondary">
                    Available for Research Partnerships
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Disclaimer Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12"
        >
          <Card className="border-yellow-500/20 bg-yellow-500/5">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-yellow-500 mb-2">
                    Important Medical Disclaimer
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    This platform is a research demonstration and educational tool only. 
                    It is not intended for medical diagnosis, treatment decisions, or clinical use. 
                    The AI models may produce inaccurate results and should never replace 
                    professional medical judgment. Always consult qualified healthcare 
                    professionals for medical advice, diagnosis, and treatment.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}