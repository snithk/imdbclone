import { Link } from "wouter";
import { Heart, Film } from "lucide-react";

export default function NavBar() {
  return (
    <nav className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2 text-xl font-bold">
              <Film className="h-6 w-6" />
              IMDB Clone
            </a>
          </Link>
          <Link href="/favorites">
            <a className="flex items-center gap-2 hover:text-primary-foreground/80">
              <Heart className="h-5 w-5" />
              Favorites
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
