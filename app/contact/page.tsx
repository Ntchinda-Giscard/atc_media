import ContactForm from "./components/contact_form";
import ContactInfoCard from "./components/contact_info_card";

function Contact() {
    return (
        <>
            <main className="min-h-full min-w-full ">
                <div className="w-full text-center">
                    <h1 className="text-3xl font-semibold"> 📞 Contactez-nous </h1>
                    <p className="font-light mt-7 text-sm px-10 mb-20">Besoin d’aide ? Une question ? Notre équipe est à votre disposition pour vous accompagner.📌 Réponse sous 24h ouvrées. </p>
                </div>
                <div className="flex w-full justify-center">
                    <div className="white-700 p-2 shadow-xl rounded-md w-2/3 flex flex-row">
                        <div className="w-1/3 h-full">
                            <ContactInfoCard />
                        </div>
                        <div className="w-2/3 h-3/4">
                            <ContactForm />
                        </div>

                    </div>
                </div>
                
            </main>
        </>
    );
}

export default Contact;