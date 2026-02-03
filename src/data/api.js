import { data } from "react-router-dom"; 

const baseUrl = "https://randomuser.me/api/";

export async function fetchContacts(query = "") {
  const response = await fetch(`${baseUrl}?seed=19&results=40&inc=login,name,phone,email,picture,dob,location&noinfo`);
  
  if (!response.ok) {
    throw data(
      { message: "Не вдалося завантажити список контактів з API" }, 
      { status: response.status }
    );
  }

  const dataRes = await response.json();
  let contacts = dataRes.results;

  if (query) {
    const lowerQuery = query.toLowerCase();
    contacts = contacts.filter(user => 
      user.name.first.toLowerCase().includes(lowerQuery) ||
      user.name.last.toLowerCase().includes(lowerQuery) ||
      user.phone.includes(lowerQuery)
    );
  }

  return contacts;
}

export async function fetchContactById(id) {
  const contacts = await fetchContacts();
  const contact = contacts.find(user => user.login.uuid === id);

  if (!contact) {
    throw data(
      { message: "Контакт із таким ID не знайдено." }, 
      { status: 404 }
    );
  }

  contact.history = getFakeHistory();
  return contact;
}

function getFakeHistory() {
    const types = ["Вхідний дзвінок", "Вихідний дзвінок", "Пропущений", "SMS", "Відеозв'язок"];
    const durations = ["1 хв", "5 хв", "12 хв", "30 с", "-"];
    const historyList = [];
    for (let i = 0; i < 5; i++) {
        const randomType = types[Math.floor(Math.random() * types.length)];
        const randomDuration = durations[Math.floor(Math.random() * durations.length)];
        const date = new Date();
        date.setDate(date.getDate() - i * 2); 
        historyList.push({
            id: i,
            date: date.toLocaleDateString(),
            action: randomType,
            details: randomDuration
        });
    }
    return historyList;
}