import ContactForm from "./components/contact_form";
import ContactInfoCard from "./components/contact_info_card";

function Contact() {
    return (
        <>
            <main className="min-h-svh min-w-full ">
                <div className="w-full text-center">
                    <h1 className="text-3xl font-semibold"> 📞 Contactez-nous </h1>
                    <p className="font-light mt-7 text-base px-10 mb-20">Besoin d’aide ? Une question ? Notre équipe est à votre disposition pour vous accompagner.📌 Réponse sous 24h ouvrées. </p>
                </div>
                <div className="flex w-full justify-center">
                    <div className="white-700 p-2 shadow-xl gap-4 flex flex-col md:flex-row rounded-md w-4/5 md:2/3 ">
                        <div className="md:w-1/3 w-full h-full flex justify-center">
                            <ContactInfoCard />
                        </div>
                        <div className="md:w-2/3 w-full h-3/4">
                            <ContactForm />
                        </div>

                    </div>
                </div>
                
            </main>
        </>
    );
}

export default Contact;