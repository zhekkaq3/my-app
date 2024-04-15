type TypePhone = {
  phone: string
}
type CartType = {
  id: number,
  quantity:number   
}

export const postData = async (phones:TypePhone, cart:CartType[]) => {
    const {phone} = phones;
    console.log({phone ,cart})
    const response = await fetch('http://o-complex.com:1337/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({phone, cart}),
    });
  
    const postData = await response.json();
    return postData
  };