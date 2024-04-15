exports.registerMail = (data) => {
    let address = ``
    for (let i = 0; i < data.address.length; i++) {
        let savedAddress = data.address[i];
        address += `<p>Address ${i + 1} : ${savedAddress}</p>`
    }
    return `
        <p>Hello ${data.firstName} ${data.lastName}.</p>
        <p>You have registered successfully.</p>
        <p>Your details are :</p>
        <p>Email: ${data.email}</p>
        <p>Mobile: ${data.phoneNumber}</p>
        <p>DOB: ${new Date(data.dob).toLocaleDateString("en-GB")}</p>
        ${address}        
    `
}