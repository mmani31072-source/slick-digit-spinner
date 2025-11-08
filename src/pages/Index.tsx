import Calculator from "@/components/Calculator";

const Index = () => {
  return (
    <main className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-br from-background to-muted">
      <div className="w-full max-w-md">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Calculator</h1>
          <p className="text-muted-foreground">Simple & elegant calculations</p>
        </header>
        <Calculator />
      </div>
    </main>
  );
};

export default Index;
