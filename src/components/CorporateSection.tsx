import { useState, type FormEvent } from 'react'
import { ArrowUpRight, ArrowRight, Check, DownloadSimple, Gift, Sparkle } from '@phosphor-icons/react'

export function CorporateSection({ openEnquiry }: { openEnquiry: () => void }) {
  return <section className="corporate section-shell" id="corporate" aria-labelledby="corporate-heading">
    <div className="corporate-panel">
      <div className="corporate-copy"><p className="eyebrow">For the people behind the work</p><h2 id="corporate-heading">Less corporate.<br />More connection.</h2><p>For your team’s big wins, warm welcomes, and well-earned thank yous. Gifts that feel like people, not procurement.</p><button className="button button-primary" onClick={openEnquiry}>Let’s talk gifting <ArrowUpRight size={20} /></button></div>
      <div className="corporate-art"><img src="/images/thank-you.webp" alt="A collection of black gift boxes with golden bows, ready for a team celebration" width="720" height="760" loading="lazy" /><div className="corporate-stamp"><Gift size={29} weight="light" /><span>Good people.<br />Good gifts.</span><Sparkle size={18} /></div></div>
    </div>
  </section>
}

type FormFields = { name: string; email: string; company: string; quantity: string; message: string }
export function CorporateEnquiry() {
  const [fields, setFields] = useState<FormFields>({ name: '', email: '', company: '', quantity: '25', message: '' })
  const [errors, setErrors] = useState<Partial<Record<keyof FormFields, string>>>({})
  const [downloaded, setDownloaded] = useState(false)
  const [downloadError, setDownloadError] = useState('')
  function change(key: keyof FormFields, value: string) {
    setFields((previous) => ({ ...previous, [key]: value }))
    setErrors((previous) => ({ ...previous, [key]: undefined }))
    setDownloaded(false)
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const next: Partial<Record<keyof FormFields, string>> = {}
    if (!fields.name.trim()) next.name = 'Please add your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) next.email = 'Please use a valid email address.'
    if (!fields.company.trim()) next.company = 'Please add your company or team name.'
    if (!Number.isInteger(Number(fields.quantity)) || Number(fields.quantity) < 1 || Number(fields.quantity) > 10000) next.quantity = 'Choose between 1 and 10,000 gifts.'
    setErrors(next)
    if (Object.keys(next).length) { document.getElementById(`enquiry-${Object.keys(next)[0]}`)?.focus(); return }
    try {
      const text = `HOUSE OF HAMPERS\nCorporate gifting enquiry draft\n\nName: ${fields.name.trim()}\nEmail: ${fields.email.trim()}\nCompany: ${fields.company.trim()}\nNumber of gifts: ${fields.quantity}\n\nYour ideas:\n${fields.message.trim() || 'To be discussed.'}\n\nThis is a local draft only. It has not been sent to House of Hampers and is not an order.`
      const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }))
      const link = document.createElement('a')
      link.href = url; link.download = 'hoh-gifting-enquiry.txt'; document.body.append(link); link.click(); link.remove()
      window.setTimeout(() => URL.revokeObjectURL(url), 1000)
      setDownloadError(''); setDownloaded(true)
    } catch { setDownloadError('Your browser couldn’t download the draft. You can copy your details from the form instead.') }
  }
  return <div className="enquiry-content"><p className="eyebrow">Something good for your people</p><h2>Let’s make it<br />a thoughtful one.</h2><p className="dialog-body">Tell us what you have in mind. For now, you can save an enquiry draft to your device. Nothing is sent.</p>
    <form onSubmit={submit} noValidate className="enquiry-form">
      <div className="form-grid">
        {([
          ['name', 'Your name', 'text', 'name'], ['email', 'Work email', 'email', 'email'], ['company', 'Company / team', 'text', 'organization'], ['quantity', 'Number of gifts', 'number', 'off'],
        ] as const).map(([key, label, type, autoComplete]) => <div className="form-field" key={key}><label htmlFor={`enquiry-${key}`}>{label}</label><input id={`enquiry-${key}`} name={key} type={type} autoComplete={autoComplete} value={fields[key]} onChange={(event) => change(key, event.target.value)} min={type === 'number' ? 1 : undefined} max={type === 'number' ? 10000 : undefined} maxLength={type === 'number' ? undefined : 150} required aria-invalid={!!errors[key]} aria-describedby={errors[key] ? `error-${key}` : undefined} />{errors[key] && <span className="field-error" id={`error-${key}`}>{errors[key]}</span>}</div>)}
      </div>
      <div className="form-field"><label htmlFor="enquiry-message">What’s the occasion? <span>(optional)</span></label><textarea id="enquiry-message" name="message" rows={3} maxLength={1000} value={fields.message} onChange={(event) => change('message', event.target.value)} placeholder="A team milestone, festive gifts, a big thank you..." /></div>
      <button className="button button-primary full-width" type="submit"><DownloadSimple size={20} />Download enquiry draft <ArrowRight size={19} /></button>
      {downloaded && <div className="form-success" role="status"><Check size={22} /><span>Your draft is ready. It has not been sent and no order has been placed.</span></div>}
      {downloadError && <p className="field-error" role="alert">{downloadError}</p>}
      <p className="dialog-disclaimer">Your details stay in this form and the file you download. Closing this form clears them.</p>
    </form>
  </div>
}
