import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t bg-background/50">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex items-center space-x-4">
          <p className="text-sm text-muted-foreground">
            © semicolon — Research demo only.
          </p>
        </div>
        <div className="flex items-center space-x-6">
          <Link 
            to="#" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Privacy
          </Link>
          <Link 
            to="#" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}