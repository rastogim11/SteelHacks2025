import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Database, 
  Image, 
  Brain, 
  Shield, 
  Upload, 
  Zap, 
  Eye, 
  ArrowRight 
} from 'lucide-react';

export function Home() {
  const valueCards = [
    {
      icon: <Database className="h-8 w-8 text-accent" />,
      title: "AND/OR Inputs",
      description: "Work with what you have: clinical data, medical images, or both combined for comprehensive analysis."
    },
    {
      icon: <Eye className="h-8 w-8 text-accent" />,
      title: "Explainability",
      description: "Heatmaps & feature attributions help you understand the reasoning behind each prediction."
    },
    {
      icon: <Shield className="h-8 w-8 text-accent" />,
      title: "Cloud Storage",
      description: "Secure, ephemeral storage on AWS S3 with automatic cleanup and encryption at rest."
    }
  ];

  const timelineSteps = [
    {
      icon: <Database className="h-6 w-6 text-accent" />,
      title: "Choose Input",
      description: "Select clinical data, medical images, or both"
    },
    {
      icon: <Upload className="h-6 w-6 text-accent" />,
      title: "Upload Securely",
      description: "Files stored temporarily on AWS with presigned URLs"
    },
    {
      icon: <Brain className="h-6 w-6 text-accent" />,
      title: "Fuse Predictions",
      description: "Multi-modal AI combines all available information"
    },
    {
      icon: <Zap className="h-6 w-6 text-accent" />,
      title: "Get Explanations",
      description: "View heatmaps and feature importance scores"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="glow-effect absolute inset-0" />
        <div className="medical-pattern absolute inset-0 opacity-30" />
        
        <motion.div 
          className="relative mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-playfair text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            semicolon
          </h1>
          <p className="mt-6 text-xl text-muted-foreground sm:text-2xl">
            A multimodal approach to cancer insights
          </p>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload clinical data, images, or both. We fuse them to estimate malignancy risk. 
            Starting with colon cancer, expanding soon.
          </p>
          
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="text-base">
              <Link to="/test">
                Try Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-base" asChild>
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Value Cards */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-3">
            {valueCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      {card.icon}
                      <CardTitle className="text-xl">{card.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{card.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Timeline */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-card/30">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-3xl font-bold text-foreground sm:text-4xl">
              How it works
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Simple, secure, and scientifically sound
            </p>
          </motion.div>

          <div className="mt-12 grid gap-8 md:grid-cols-4">
            {timelineSteps.map((step, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 border border-accent/20">
                  {step.icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {step.description}
                </p>
                {index < timelineSteps.length - 1 && (
                  <ArrowRight className="hidden md:block h-4 w-4 text-accent/50 mt-4" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <motion.div 
          className="mx-auto max-w-4xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="p-8 text-center">
              <Badge variant="secondary" className="mb-4">
                Research Demo
              </Badge>
              <h2 className="font-playfair text-3xl font-bold text-foreground mb-4">
                Ready to explore multimodal cancer insights?
              </h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                Experience the power of combined clinical data and medical imaging 
                analysis with our interactive demo platform.
              </p>
              <Button asChild size="lg" className="text-base">
                <Link to="/test">
                  Start Testing Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}