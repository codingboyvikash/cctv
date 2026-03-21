import { useState } from 'react';
import Alert from '../../components/Alert';
import Loader from '../../components/Loader';
import { submitContactApi } from '../../api/services';
import { companyInfo } from '../../data/siteData';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const { data } = await submitContactApi(formData);
      setMessage({ type: 'success', text: data.message });
      setFormData({ name: '', email: '', mobile: '', message: '' });
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to submit inquiry.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section">
      <div className="container two-col">
        <div className="card page-card">
          <h1>Contact Us</h1>
          <p><strong>Company:</strong> {companyInfo.name}</p>
          <p><strong>Address:</strong> {companyInfo.address}</p>
          <p><strong>Mobile:</strong> {companyInfo.phone}</p>
          <p><strong>Email:</strong> {companyInfo.email}</p>
          <div className="contact-actions">
            <a className="btn" href={`https://wa.me/${companyInfo.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp</a>
            <a className="btn btn-outline" href={`tel:${companyInfo.phone}`}>Call Now</a>
          </div>
          <iframe title="Google Map" src={companyInfo.mapEmbed} className="map-frame" loading="lazy"></iframe>
        </div>

        <div className="card form-card">
          <h2>Send us an inquiry</h2>
          <Alert type={message.type} message={message.text} />
          {loading && <Loader text="Sending message..." />}
          <form onSubmit={handleSubmit} className="form-grid">
            <input placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
            <input placeholder="Mobile" value={formData.mobile} onChange={(e) => setFormData({ ...formData, mobile: e.target.value })} required />
            <textarea rows="6" placeholder="Message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required />
            <button className="btn" type="submit">Submit Inquiry</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
