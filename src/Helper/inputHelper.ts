import React from 'react'

const inputHelper = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> , 
    data:any 
    ) => {
    // spreading the data
    const tempData: any = {...data};

    // based in the name of the input element , the target value will be assigned 
    tempData[e.target.name] = e.target.value;
    return tempData;
    
};

export default inputHelper;