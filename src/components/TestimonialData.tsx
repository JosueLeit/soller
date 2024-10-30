export interface Testimonial {
  name: string
  image: string
  role: string
  content: string
  kWh: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Jane Cooper",
    image: "/assets/JoelCasali.png",
    role: "Solar Enthusiast",
    content: "Purus maecenas quis elit eu, aliquet. Tellus porttitor ut sollicitudin sit non fringilla. Quam nunc volutpat senectus neque eget amet pharetra, euismod.",
    kWh: "10kWh"
  },
  {
    name: "Ralph Edwards",
    image: "/assets/SarahJohnson.png",
    role: "Homeowner",
    content: "Vehicula sit sit pharetra bibendum ut risus accumsan. Purus, in metus, enim, ipsum morbi euismod pellentesque.",
    kWh: "32kWh"
  },
  {
    name: "Courtney Henry",
    image: "/assets/MichaelLee.png",
    role: "Business Owner",
    content: "Viverra lacus suspendisse elit, adipiscing orci, non turpis etiam sapien. Viverra blandit sem neque pretium.",
    kWh: "6kWh"
  },
  {
    name: "Cameron Williamson",
    image: "/assets/EmilyDavis.png",
    role: "Eco-Activist",
    content: "Hendrerit augue ut nec, senectus quis integer netus. Sagittis fusce rhoncus magnis habitant amet amet.",
    kWh: "12kWh"
  },
  {
    name: "Josué Leite",
    image: "/assets/JosueLeite.png",
    role: "Solar Developer",
    content: "Hire me because Egestas amet habitasse amet risus tellus ornare. Hendrerit augue ut nec, senectus mauris egestas feugiat leo.",
    kWh: "15kWh"
  }
]