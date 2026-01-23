export default function HowToFind({ title, steps}) {
    return (
        <section className="container py-4">
            <h2 className="h5 mb-3">{title}</h2>

            <ol className="row g-3 ps-3 mb-0">
                {steps.map((step, index) => (
                    <li key={index} className="col-12 col-lg-4">
                        <div className="p-3 border rounded-4 h-100">
                            <div className="fw-semibold mb-1">{step.heading}</div>
                            <div className="text-body-secondary">{step.text}</div>
                        </div>
                    </li>
                ))}
            </ol>
        </section>
    )
}