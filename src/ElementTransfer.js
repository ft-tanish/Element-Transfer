import { useState } from 'react';
import { elements } from './Elements';

export const ElementTransfer = () => {

    const [bucket1, setBucket1] = useState(elements.slice(0, elements.length / 2));
    const [bucket2, setBucket2] = useState(elements.slice(elements.length / 2));

    const addElementsToBucket2 = () => {
        setBucket2([...bucket2, ...bucket1]);
        setBucket1([]);
    };

    const addSelectedElementsToBucket2 = () => {
        const selectedElements = bucket1.filter((el) => el.selected);
        setBucket2([...bucket2, ...selectedElements]);
        setBucket1(bucket1.filter((el) => !el.selected));
    };

    const removeElementsFromBucket2 = () => {
        setBucket1([...bucket1, ...bucket2]);
        setBucket2([]);
    };

    const removeSelectedElementsFromBucket2 = () => {
        const selectedElements = bucket2.filter((el) => el.selected);
        setBucket1([...bucket1, ...selectedElements]);
        setBucket2(bucket2.filter((el) => !el.selected));
    };

    const toggleElementSelection = (element, bucket) => {
        const updatedBucket = bucket.map((el) => {
            if (el === element) {
                return { ...el, selected: !el.selected };
            }
            return el;
        });
        if (bucket === bucket1) {
            setBucket1(updatedBucket);
        } else {
            setBucket2(updatedBucket);
        }
    };

    return (
        <>
            <h2>Transfer Elements</h2>
            <div className='element-main'>
                <div className='bucket'>
                    <h2>Bucket 1</h2>
                    <ul>
                        {bucket1.map((element) => (
                            <li key={element.id} onClick={() => toggleElementSelection(element, bucket1)}>
                                {element.name} {element.selected && '✓'}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='btn-box'>
                    <button onClick={addSelectedElementsToBucket2}>Add Selected Elements</button>
                    <button onClick={addElementsToBucket2}>Add All Elements</button>
                    <button onClick={removeElementsFromBucket2}>Remove All Elements</button>
                    <button onClick={removeSelectedElementsFromBucket2}>Remove Selected Elements</button>
                </div>
                <div className='bucket'>
                    <h2>Bucket 2</h2>
                    <ul>
                        {bucket2.map((element) => (
                            <li key={element.id} onClick={() => toggleElementSelection(element, bucket2)}>
                                {element.name} {element.selected && '✓'}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
