import Contact from "../entities/Contact.entity";
import Client from "../entities/Client.entity";
import AppError from "../errors/AppErrors.error";
import { CreateContact, ContactReturn, ContactUpdate, ReadAllContacts } from "../interfaces/contacts.interface";
import { clientRepo, contactRepo } from "../repositories";
import { contactSchema, readAllContactsSchema } from "../schemas/contacts.schema";


export const createContactService = async (
  data: CreateContact
): Promise<ContactReturn> => {
   const client: Client | null = await clientRepo.findOneBy({ id: data.clientId})
  
    if(!client) throw new AppError('Client not found', 404)

    const { password, ...clientDataWithoutPassword } = client

    const contactDataWithoutPassword = {
      ...data,
      client: clientDataWithoutPassword
  };
  

  const contact: Contact = await contactRepo.save(contactDataWithoutPassword);


  
    return contact
};





export const updateContactService = async (data: ContactUpdate, contact: Contact): Promise<ContactReturn> => {
 
  const contactUpdate: Contact = contactRepo.create({...contact, ...data})

  await contactRepo.save(contactUpdate)

  return contactSchema.parse(contactUpdate)
}

export const readAllContactsService = async () => {
  const contacts: Contact[] = await contactRepo.find(({
    withDeleted: true
  }))

  const data = {
    contacts: contacts,
  };

  return data;
}


export const deleteContactService = async (contact: Contact): Promise<void> => {
  await contactRepo.remove(contact)
}