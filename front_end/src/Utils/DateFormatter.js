export const DateFormatter = (date) => {
    let user_date = new Date(date);
    const month = ['Января' , 'Февраля' , 'Марта' , 'Апреля' , 'Мая' , 'Июня' , 'Июля' , 'Августа' , 'Сентября' , 'Октября' , 'Ноября' , 'Декабря'];
   return ( user_date.getDate() + ' ' + month[user_date.getMonth()].toLowerCase())
}