import Image from 'next/image';
import SystemFeature from '../../public/assets/SystemFeatures.png'

export default function SystemFeatures() {
  return (
    // <section className="relative overflow-hidden bg-white py-12 lg:py-20">
     <section className="flex items-center overflow-hidden bg-white py-12 lg:py-20">
      {/* Purple background shape */}
                                       
          {/* Content */}
          <div className="space-y-12 p-16">
            <div>
              <h4 className="text-sm font-medium uppercase tracking-wide text-orange-500">Services</h4>
              <h2 className="mt-4 text-4xl font-bold tracking-tight text-gray-900">Personalized services</h2>
              <p className="mt-4 text-lg text-gray-600">
                Pretium lectus ultrices sit tempor, sit ullamcorper volutpat et et. Auctor turpis semper id sit ornare maecenas lectus sed.
              </p>
            </div>
            
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Et mauris</h3>
                <p className="mt-2 text-gray-600">
                  Posuere quis sed mauris non curabitur pretium elementum eget. Feugiat sed maecenas eu accumsan tristique.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Eget sit</h3>
                <p className="mt-2 text-gray-600">
                  Sit bibendum donec dolor fames neque vulputate non sit aliquam. Consequat turpis natoque leo, massa.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Imperdiet pellentesque</h3>
                <p className="mt-2 text-gray-600">
                  Platea arcu dapibus non magna cursus lectus id sollicitudin. Enim viverra parturient tristique nulla.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Non libero</h3>
                <p className="mt-2 text-gray-600">
                  Congue mauris sem vel, urna viverra. Urna, nibh leo suscipit purus ut sed eros, consectetur viverra.
                </p>
              </div>
            </div>
            </div>
            <Image 
              src={SystemFeature} 
              alt="Technician working with solar panels" 
              width={500}
              height={950}
              className=""              
              />
    </section>
  )
}