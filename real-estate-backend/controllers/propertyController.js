const generatePropertyCode = () => {
    const prefix = 'PROP';
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    return `${prefix}${randomNumber}`; // e.g., PROP428391
  };

  