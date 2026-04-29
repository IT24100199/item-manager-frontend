import { useEffect, useState } from 'react';

const API = 'http://item-manager-backend-production-dd47.up.railway.app';

function App() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', description: '',price: '', category:'' });

  const fetchItems = () =>
    fetch(API).then(r => r.json()).then(setItems);

  useEffect(() => { fetchItems(); }, []);

  const handleSubmit = async () => {
    await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    setForm({ name: '', description: '' });
    fetchItems();
  };

  const handleDelete = async (id) => {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    fetchItems();
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>Item Manager</h1>

      <div style={{ marginBottom: 24 }}>
        <input placeholder="Name" value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          style={{ display: 'block', marginBottom: 8, padding: 8, width: '100%' }} />
        <input placeholder="Description" value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          style={{ display: 'block', marginBottom: 8, padding: 8, width: '100%' }} />
        <input placeholder="Price" type="number" value={form.price}
  onChange={e => setForm({ ...form, price: e.target.value })}
  style={{ display: 'block', marginBottom: 8, padding: 8, width: '100%' }} />
<input placeholder="Category" value={form.category}
  onChange={e => setForm({ ...form, category: e.target.value })}
  style={{ display: 'block', marginBottom: 8, padding: 8, width: '100%' }} />  
        <button onClick={handleSubmit}>Add Item</button>
      </div>

      {items.map(item => (
        <div key={item._id} style={{ border: '1px solid #ccc', padding: 12, marginBottom: 8, borderRadius: 6 }}>
          <strong>{item.name}</strong>
          <p style={{ margin: '4px 0' }}>{item.description}</p>
          <p style={{ margin: '4px 0' }}>Price: ${item.price}</p>
          <p style={{ margin: '4px 0' }}>Category: ${item.category}</p>
          <button onClick={() => handleDelete(item._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;