import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FAQ = () => {
  const faqs = [
    {
      question: "How do I place a bid?",
      answer: "Simply navigate to an auction, enter your bid amount, and click 'Place Bid'. Make sure you have sufficient credits in your wallet."
    },
    {
      question: "When are credits charged?",
      answer: "Credits are only charged when you win an auction. If you don't win, your credits remain in your wallet."
    },
    {
      question: "What happens if I win an auction?",
      answer: "You'll receive an email confirmation and your credits will be charged. The seller will contact you for shipping details."
    },
    {
      question: "Can I cancel a bid?",
      answer: "Bids cannot be cancelled once placed. Please bid responsibly and only bid amounts you're comfortable paying."
    },
    {
      question: "How do refunds work?",
      answer: "If an auction is cancelled or an item is misrepresented, you'll receive a full refund to your wallet within 3-5 business days."
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h1>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-gradient-card border-card-border">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;