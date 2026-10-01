import { useState } from 'react';

export default function SettingsForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      alert("Name and email are required");
      return;
    }
    console.log("Saved", { name, email, bio });
    alert("Profile saved successfully!");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px', margin: '0 auto', padding: '20px' }}>
      <h2>Settings</h2>
      <div>
        <label>Name: </label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div>
        <label>Email: </label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Bio: </label>
        <textarea value={bio} onChange={e => setBio(e.target.value)} />
      </div>
      <button type="submit">Save</button>
    </form>
  );
}
