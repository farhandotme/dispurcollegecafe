const Footer = () =>{
    return (
        <footer className="bg-cafe-tan text-cafe-light py-2 md:py-8 px-4 rounded-md">
  <div className="max-w-7xl mx-auto flex flex-col justify-between items-center gap-6">
    {/* Brand Info */}
    <div className="text-center">
      <h2 className="text-4xl font-cookie-regular">Beanzy Cafe</h2>
      <p className="text-2xl font-cookie-regular text-cafe-cream/70 mt-2">
        Crafted with passion by Mafijur Ali & Farhan Hussian for Dispur College.
      </p>
    </div>
    {/* Social Icons (use real links later) */}
    <div className="flex gap-4 text-xl">

    </div>
  </div>

  {/* Bottom note */}
  <div className="text-center text-sm text-cafe-cream/60 mt-2">
    © {new Date().getFullYear()} Beanzy Cafe. All rights reserved.
  </div>
</footer>

    )
}

export default Footer