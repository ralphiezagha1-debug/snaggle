const Privacy = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <div className="prose prose-invert max-w-none text-muted-foreground">
            <p>Last updated: January 2024</p>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Information We Collect</h2>
            <p>We collect information you provide directly to us...</p>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">How We Use Your Information</h2>
            <p>We use the information we collect to provide and improve our services...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;