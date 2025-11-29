"use client";

import { FormattedMessage, useIntl } from "react-intl";


export default function ContactPage() {

    const intl = useIntl()

    const placeholderText = {
        firstName: intl.formatMessage({id: "contact.firstName"}),
        lastName: intl.formatMessage({id: "contact.lastName"}),
        email: intl.formatMessage({id: "contact.email"}),
        textBox: intl.formatMessage({id: "contact.textBox.placeholder"})
    }


    return (
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
            <main className="flex-grow mt-48 flex flex-col items-center text-center px-6 pb-20">
                <section className="w-full max-w-2xl">
                    {/* Header */}
                    <div className="mb-16">
                        <h1 className="text-6xl font-black mb-6 text-slate-900 tracking-tight uppercase">
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

                    {/* Contact Form */}
                    <form className="modern-card bg-white border-l-4 border-l-blue-600 comic-outline">
                        <div className="space-y-5">
                            {/*Inputs for the first and last name of person who wants to contact the ARA lab*/}
                            <div className="grid sm:grid-cols-2 gap-4">
                                {/* First Name Input */}
                                <div>
                                    <label 
                                        htmlFor="firstName" 
                                        className="block text-sm font-semibold text-gray-700 mb-1 text-left"
                                    >
                                        <FormattedMessage id="contact.firstName" />
                                    </label>
                                    <input
                                        type="text" 
                                        id="firstName"
                                        placeholder={placeholderText.firstName}
                                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white font-semibold"                                    />
                                </div>
                                
                                {/* Last Name Input */}
                                <div>
                                    <label 
                                        htmlFor="lastName" 
                                        className="block text-sm font-semibold text-gray-700 mb-1 text-left"
                                    >
                                        <FormattedMessage id="contact.lastName" />
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        placeholder={placeholderText.lastName}
                                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white font-semibold"
                                    />
                                </div>
                            </div>

                            {/*Contacting person's email*/}
                            <div>
                                <label 
                                    htmlFor="emailAddress" 
                                    className="block text-sm font-semibold text-gray-700 mb-1 text-left" 
                                >
                                    <FormattedMessage id="contact.email" />
                                </label>
                                <input
                                    type="email"
                                    id="emailAddress"
                                    placeholder={placeholderText.email}
                                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white font-semibold"
                                />
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
                                    id="message"
                                    placeholder={placeholderText.textBox}
                                    rows={6} 
                                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white resize-none font-medium"
                                ></textarea>
                            </div>
                        </div>

                        {/*Button to submit the form*/}
                        <button
                            type="submit"
                            className="mt-8 w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-black rounded-lg hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all uppercase tracking-wide text-lg"
                        >
                            <FormattedMessage id="contact.submit" />
                        </button> 
                    </form>
                </section>
            </main>
        </div>  
    )
}