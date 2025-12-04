"use client";
import { FormEvent } from "react";
import { FormattedMessage, useIntl } from "react-intl";


export default function ContactPage() {

    const intl = useIntl()

    const placeholderText = {
        firstName: intl.formatMessage({id: "contact.firstName"}),
        lastName: intl.formatMessage({id: "contact.lastName"}),
        email: intl.formatMessage({id: "contact.email"}),
        textBox: intl.formatMessage({id: "contact.textBox.placeholder"})
    }

    //Doing all contact through a mailto since resend needed a purchased domain
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;

        const first = (form.elements.namedItem("firstName") as HTMLInputElement).value;
        const last = (form.elements.namedItem("lastName") as HTMLInputElement).value;
        
        const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

        const subject = encodeURIComponent(`Message from ${first} ${last}`);
        const body = encodeURIComponent(
        `${message}`
        );

        const mailto = `mailto:umlaralab@gmail.com?subject=${subject}&body=${body}`;

        window.location.href = mailto;
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
            <main className="flex-grow mt-48 flex flex-col items-center text-center px-6 pb-20" role="main">
                <section className="w-full max-w-2xl" role="region" aria-labelledby="contact-title">
                    {/* Header */}
                    <div className="mb-16">
                        <h1 className="text-6xl font-black mb-6 text-slate-900 tracking-tight uppercase" id="contact-title">
                            <FormattedMessage id="contact.title" />
                        </h1>
                        <div className="flex gap-3 mb-6 justify-center">
                            <div className="h-3 w-40 bg-blue-600 rounded-full"></div>
                            <div className="h-3 w-20 bg-rose-500 rounded-full"></div>
                        </div>
                        <p className="text-xl text-slate-600 font-bold">
                            <FormattedMessage id="contact.headline" />
                        </p>
                    </div>

                    {/*Contact Form*/}
                    <form onSubmit={handleSubmit} className="modern-card bg-white border-l-4 border-l-blue-600 comic-outline" role="form" aria-label="Contact form">
                        <div className="space-y-5">
                            {/*Inputs for the first and last name of person who wants to contact the ARA lab*/}
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label 
                                        htmlFor="firstName" 
                                        className="block text-sm font-semibold text-gray-700 mb-1 text-left"
                                    >
                                        <FormattedMessage id="contact.firstName" />
                                    </label>
                                    <input
                                        type="text" 
                                        name="firstName"
                                        id="firstName"
                                        placeholder={placeholderText.firstName}
                                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white font-semibold"
                                        required
                                        aria-required="true"
                                    />
                                </div>
                                
                                <div>
                                    <label 
                                        htmlFor="lastName" 
                                        className="block text-sm font-semibold text-gray-700 mb-1 text-left"
                                    >
                                        <FormattedMessage id="contact.lastName" />
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        id="lastName"
                                        placeholder={placeholderText.lastName}
                                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white font-semibold"
                                        required
                                        aria-required="true"
                                    />
                                </div>
                            </div>

                            {/*Contact message*/}
                            <div>
                                <label 
                                    htmlFor="message" 
                                    className="block text-sm font-semibold text-gray-700 mb-1 text-left"
                                >
                                    <FormattedMessage id="contact.textBox" />
                                </label>
                                <textarea
                                    name="message"
                                    id="message"
                                    placeholder={placeholderText.textBox}
                                    rows={6} 
                                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white resize-none font-medium"
                                    required
                                    aria-required="true"
                                ></textarea>
                            </div>
                        </div>

                        {/*Button to submit the form*/}
                        <button
                            type="submit"
                            className="mt-8 w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-black rounded-lg hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all uppercase tracking-wide text-lg"
                            aria-label="Submit contact form"
                        >
                            <FormattedMessage id="contact.submit" />
                        </button> 
                    </form>
                </section>
            </main>
        </div>  
    )
}