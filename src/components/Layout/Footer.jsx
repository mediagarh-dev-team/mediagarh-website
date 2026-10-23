export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-center px-4 text-sm text-muted-foreground">
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </footer>
  );
}
