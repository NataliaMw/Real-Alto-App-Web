

function Proximamente() {

    return (
        <div className="min-h-screen w-full bg-gray-900 flex flex-col items-center justify-center relative px-4">
            <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-30"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1604093882750-3ed498f3178b')" }}>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl text-white font-bold mb-8 z-10">Próximamente</h1>
            <p className="text-white text-center text-xl md:text-2xl">
                Estamos trabajando duro para ofrecerte la mejor experiencia posible. Quédate atento a nuestras redes sociales para más información.
            </p>
        </div>
    )
}

export default Proximamente;