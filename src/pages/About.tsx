import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">About Snaggle</h1>
          <Card className="bg-gradient-card border-card-border">
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                Snaggle is revolutionizing the online auction experience by creating a premium platform 
                where collectors, enthusiasts, and investors can discover and acquire exceptional items 
                with confidence and excitement.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Founded by a team of auction experts and technology innovators, we're committed to 
                providing the most secure, transparent, and enjoyable auction experience possible.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;