import { useEffect, useState } from 'react';
import FileBase64 from 'react-file-base64';
const getItems = async () => {
    try {
        const { data } = await getItems();
        return data
    } catch (error) {
        console.log(error)
    }
}
const createItem = async (todo) => {
    try {
        const { data } = await createItem(todo);
        return data
    } catch (error) {
        console.log(error)
    }
}
    function Temp() {
        const [item, setItem] = useState({ title: '', image: '' });
        const [items, setItems] = useState([])
        const onSubmitHandler = async (e) => {
            e.preventDefault();
            const result = await createItem(item);
            setItems([...items, result]);
        }
        useEffect(() => {
            const fetchData = async () => {
                const result = await getItems();
                console.log('fetch data;m', result)
                setItems(result)
            }
            fetchData()
        }, [])
        return (
            <div className="container">
                <pre>{JSON.stringify(item, null, '\t')}</pre>
                <form action="" onSubmit={onSubmitHandler}>
                    <input type="text" className="input-field"
                        onChange={e => setItem({ ...item, title: e.target.value })}
                    />
                    <FileBase64
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => setItem({ ...item, image: base64 })}
                    />
                    <div className="right-align">
                        <button className="btn">submit</button>
                    </div>
                </form>
                {items?.map(item => (
                    <div className="card" key={item._id}>
                        <div className="card-image waves-effect waves-block waves-light">
                            <img className="activator" style={{ width: '100%', height: 300 }} src={item.image} alt='error' />
                        </div>
                        <div className="card-content">
                            <span className="card-title activator grey-text text-darken-4">{item.title}</span>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
    export default Temp;