import { faker } from '@faker-js/faker';

export const generateDoctors = (count = 100) => {
  const tamilNames = [
    'Karthick Raja', 'Dinesh Kumar', 'Mohan Raj', 'Arun Kumar', 'Suresh Babu', 
    'Manikandan V', 'Vijay Thalapathy', 'Senthil Kumar', 'Prakash Raj', 'Sivakumar', 
    'Lakshmi Narayan', 'Gayathri R', 'Nandhini S', 'Sujatha P', 'Priya Dharshini',
    'Hemalatha K', 'Renuka Devi', 'Kavitha M', 'Meena Kumari', 'Chitra L',
    'Ramesh Kanna', 'Prabhu Deva', 'Sathish Kumar', 'Balaji M', 'Karthikeyan P', 
    'Saravanan R', 'Rajesh K', 'Bhaskar R', 'Subramani S', 'Ashok Kumar'
  ];
  
  const specializations = [
    'General Medicine', 'Cardiology', 'Neurology', 'Orthopedics', 
    'Dermatology', 'Pediatrics', 'Oncology', 'Gynecology', 
    'Psychiatry', 'ENT', 'Ophthalmology', 'Urology', 
    'Gastroenterology', 'Pulmonology', 'Nephrology'
  ];

  return Array.from({ length: count }).map((_, i) => ({
    id: `DOC-${1000 + i}`,
    name: `Dr. ${tamilNames[i % tamilNames.length]}`,
    specialization: faker.helpers.arrayElement(specializations),
    qualification: faker.helpers.arrayElement(['MBBS, MD', 'MBBS, MS', 'MBBS, DCH', 'MBBS, DGO']),
    experience: faker.number.int({ min: 2, max: 35 }),
    consultationFee: faker.number.int({ min: 300, max: 1500 }),
    rating: faker.number.float({ min: 3.5, max: 5, fractionDigits: 1 }),
    hospitalAssignment: 'Cerulean Main Branch'
  }));
};

export const generatePatients = (count = 1000) => {
  const patientNames = [
    'Meenakshi', 'Saravanan', 'Anbu Selvan', 'Kalaivani R', 'Muthu Kumar', 'Senthil', 
    'Aravind Swamy', 'Gowtham Menon', 'Rajinikanth', 'Kamal Haasan', 'Lakshmi P', 
    'Priya Anand', 'Nandhini V', 'Meena S', 'Kavitha R', 'Gayathri M', 
    'Ramya Krishnan', 'Chitra S', 'Jayanthi P', 'Abirami V', 'Surya K', 
    'Vikram Prabhu', 'Kamalesh N', 'Dileep R', 'Krishna K', 'Bhavani V', 
    'Mala R', 'Geetha K', 'Radha Ravi', 'Divya Spandana'
  ];
  
  const districts = [
    'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 
    'Erode', 'Tiruppur', 'Thanjavur', 'Thoothukudi', 'Tirunelveli',
    'Kanyakumari', 'Karur', 'Namakkal', 'Dindigul', 'Vellore'
  ];

  return Array.from({ length: count }).map((_, i) => {
    // Generate avatar for 30% of patients
    const hasAvatar = Math.random() > 0.7;
    // Use an unseplash profile picture placeholder if hasAvatar
    const avatar = hasAvatar ? `https://i.pravatar.cc/150?u=${i}` : undefined;

    return {
      id: `PAT-${10000 + i}`,
      name: faker.helpers.arrayElement(patientNames),
      avatar,
      age: faker.number.int({ min: 1, max: 95 }),
      phone: `+91 ${faker.number.int({ min: 6000000000, max: 9999999999 })}`,
      district: faker.helpers.arrayElement(districts),
      bloodGroup: faker.helpers.arrayElement(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']),
      history: faker.helpers.arrayElements(['Diabetes', 'Hypertension', 'Asthma', 'None'], { min: 1, max: 2 }),
      status: faker.helpers.arrayElement(['Active', 'Inactive', 'Discharged']),
      lastVisit: faker.date.recent({ days: 90 }).toISOString()
    };
  });
};
