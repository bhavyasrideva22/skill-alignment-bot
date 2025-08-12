import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Clock, Award, ArrowRight, CheckCircle } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Psychometric Analysis",
      description: "Evaluate your personality fit and intrinsic motivation for data analysis work"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Technical Assessment",
      description: "Test your analytical reasoning, math skills, and domain knowledge"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "WISCAR Framework",
      description: "Comprehensive evaluation across Will, Interest, Skill, Cognitive, Ability, and Real-world dimensions"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Personalized Recommendations",
      description: "Get tailored career guidance and learning paths based on your unique profile"
    }
  ];

  const careerPaths = [
    "Product Data Analyst",
    "Growth Analyst", 
    "Business Intelligence Analyst",
    "Data-driven Product Manager",
    "Marketing Analyst"
  ];

  const skillsAssessed = [
    "Analytical thinking",
    "Statistical reasoning", 
    "SQL proficiency",
    "A/B testing knowledge",
    "Business intuition",
    "Communication skills"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-hero text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Badge className="mb-6 bg-white/20 text-white border-white/30">
            Free Career Assessment
          </Badge>
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Should You Learn Product Data Analysis?
          </h1>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover if Product Data Analysis is the right career path for you with our comprehensive, 
            AI-powered assessment that evaluates your interests, skills, and potential for success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              onClick={() => navigate('/assessment')}
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4 shadow-glow"
            >
              Start Assessment
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <div className="text-sm opacity-80 flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>15-20 minutes • Completely Free</span>
            </div>
          </div>
        </div>
      </div>

      {/* What You'll Discover */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What You'll Discover</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our scientifically-designed assessment provides deep insights into your career fit
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center bg-gradient-card shadow-card border-0 hover:shadow-glow transition-all duration-300">
                <div className="flex justify-center mb-4 text-primary">
                  {feature.icon}
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Career Paths */}
      <div className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Career Paths You'll Explore</h2>
            <p className="text-xl text-muted-foreground">
              Product Data Analysis opens doors to many exciting career opportunities
            </p>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {careerPaths.map((path, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-soft">
                <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                <span className="font-medium">{path}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skills Assessment */}
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Skills & Traits We Assess</h2>
            <p className="text-xl text-muted-foreground">
              We evaluate both your current capabilities and your potential for growth
            </p>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {skillsAssessed.map((skill, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16 px-4 bg-gradient-card">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">How It Works</h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto">
                1
              </div>
              <h3 className="font-semibold text-lg">Answer Questions</h3>
              <p className="text-muted-foreground">
                Complete our comprehensive assessment covering interests, skills, and aptitude
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto">
                2
              </div>
              <h3 className="font-semibold text-lg">Get Your Scores</h3>
              <p className="text-muted-foreground">
                Receive detailed scores across psychometric, technical, and WISCAR dimensions
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto">
                3
              </div>
              <h3 className="font-semibold text-lg">Follow Your Path</h3>
              <p className="text-muted-foreground">
                Get personalized recommendations and a customized learning roadmap
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 bg-gradient-hero text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Discover Your Path?</h2>
          <p className="text-xl opacity-90 mb-8">
            Take the first step towards a data-driven career with our free assessment
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/assessment')}
            className="bg-white text-primary hover:bg-white/90 text-lg px-12 py-4 shadow-glow"
          >
            Start Your Assessment Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
