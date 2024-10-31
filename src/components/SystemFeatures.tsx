import Image from 'next/image';
import SystemFeature from '../../public/assets/SystemFeatures.png';

export default function SystemFeatures() {
  return (
     <section className="flex flex-col-reverse lg:flex-row gap-16 items-center overflow-hidden bg-white py-12 lg:py-20">
        
        <div className="flex justify-center w-full lg:w-auto order-10">
          <Image 
            src={SystemFeature} 
            alt="Technician working with solar panels" 
            width={500}
            height={950}
            className="w-full max-w-[22.375rem] sm:max-w-none sm:h-auto object-cover"
          />
        </div>
        
        <div className="space-y-12 px-8 lg:px-16">
          <div className="text-center lg:text-left">
            <h4 className="text-sm font-medium uppercase tracking-wide text-orange-500">System features</h4>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-blacked">Powerful features</h2>
            <p className="mt-4 text-lg text-blacked">
              Pretium lectus ultrices sit tempor, sit ullamcorper volutpat et et. Auctor turpis semper id sit ornare maecenas lectus sed.
            </p>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold text-blacked">Erat sit</h3>
              <p className="mt-2 text-blacked">
                Id quis lectus pharetra, ultricies integer montes, amet, gravida consectetur. Nunc convallis fringilla nisl magna sagittis.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-blacked">Ullamcorper arcu</h3>
              <p className="mt-2 text-blacked">
                Ipsum at id hendrerit amet faucibus commodo quam nullam. Lectus auctor habitant duis dictum.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-blacked">Et pellentesque</h3>
              <p className="mt-2 text-blacked">
                Mi vitae, massa eu molestie massa euismod volutpat condimentum. Blandit molestie ullamcorper hendrerit purus lorem vulputate.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-blacked">Amet egestas</h3>
              <p className="mt-2 text-blacked">
                Elementum, libero, lacus, vel ullamcorper at velit id. Malesuada velit et, ullamcorper malesuada amet, felis.
              </p>
            </div>
          </div>
        </div>
    </section>
  )
}
