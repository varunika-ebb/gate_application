// Mock test questions for all GA sections
const gaMockTestQuestions = {
  va: {
    1: [
      {
        id: 1,
        question: "Choose the synonym for 'ELOQUENT':",
        options: ["Silent", "Articulate", "Confused", "Hesitant"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 1
      },
      {
        id: 2,
        question: "Identify the correct sentence:",
        options: [
          "The data is accurate",
          "The data are accurate", 
          "The data was accurate",
          "The data were accurate"
        ],
        correctAnswer: 1,
        type: "MCQ",
        marks: 2
      },
      {
        id: 3,
        question: "Choose the antonym of 'FRUGAL':",
        options: ["Economical", "Thrifty", "Extravagant", "Careful"],
        correctAnswer: 2,
        type: "MCQ",
        marks: 1
      },
      {
        id: 4,
        question: "Complete: 'She has been working here _____ five years.'",
        options: ["since", "for", "from", "during"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 1
      },
      {
        id: 5,
        question: "Choose the meaning of 'A piece of cake':",
        options: ["Something sweet", "Something easy", "Something expensive", "Something rare"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 2
      },
      {
        id: 6,
        question: "Identify the passive voice: 'The committee will announce the results.'",
        options: [
          "The results will be announced by the committee",
          "The results are announced by the committee",
          "The results were announced by the committee",
          "The results have been announced by the committee"
        ],
        correctAnswer: 0,
        type: "MCQ",
        marks: 2
      },
      {
        id: 7,
        question: "Choose the correct spelling:",
        options: ["Occassion", "Occasion", "Ocasion", "Occassion"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 1
      },
      {
        id: 8,
        question: "Select the synonym for 'PRISTINE':",
        options: ["Dirty", "Old", "Pure", "Damaged"],
        correctAnswer: 2,
        type: "MCQ",
        marks: 1
      },
      {
        id: 9,
        question: "Choose the correct form: 'Either John or his friends _____ coming.'",
        options: ["is", "are", "was", "were"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 2
      },
      {
        id: 10,
        question: "Identify the figure of speech: 'Time is money.'",
        options: ["Simile", "Metaphor", "Personification", "Hyperbole"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 1
      }
    ],
    2: [
      {
        id: 1,
        question: "Choose the antonym of 'ZENITH':",
        options: ["Peak", "Summit", "Nadir", "Height"],
        correctAnswer: 2,
        type: "MCQ",
        marks: 2
      },
      {
        id: 2,
        question: "Complete the analogy: Pen : Write :: Knife : ?",
        options: ["Sharp", "Cut", "Kitchen", "Steel"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 1
      },
      {
        id: 3,
        question: "Choose the correct preposition: 'He is afraid _____ dogs.'",
        options: ["from", "of", "with", "by"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 1
      },
      {
        id: 4,
        question: "Identify the error: 'One of the boys have lost his book.'",
        options: ["One", "have", "lost", "his"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 2
      },
      {
        id: 5,
        question: "Choose the meaning of 'To burn the midnight oil':",
        options: ["To waste oil", "To work late", "To light a lamp", "To cook at night"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 2
      },
      {
        id: 6,
        question: "Select the synonym for 'TENACIOUS':",
        options: ["Weak", "Persistent", "Flexible", "Careless"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 1
      },
      {
        id: 7,
        question: "Choose the correct article: '_____ honest man is respected.'",
        options: ["A", "An", "The", "No article"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 1
      },
      {
        id: 8,
        question: "Identify the type: 'Please close the door.'",
        options: ["Declarative", "Interrogative", "Exclamatory", "Imperative"],
        correctAnswer: 3,
        type: "MCQ",
        marks: 1
      },
      {
        id: 9,
        question: "Choose the correct form: 'I wish I _____ rich.'",
        options: ["am", "was", "were", "will be"],
        correctAnswer: 2,
        type: "MCQ",
        marks: 2
      },
      {
        id: 10,
        question: "Select the antonym of 'MUNDANE':",
        options: ["Ordinary", "Exciting", "Common", "Regular"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 1
      }
    ],
    3: [
      {
        id: 1,
        question: "Choose the synonym for 'PERSPICACIOUS':",
        options: ["Confused", "Perceptive", "Ignorant", "Careless"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 2
      },
      {
        id: 2,
        question: "Complete: 'The meeting has been _____ due to bad weather.'",
        options: ["postponed", "preponed", "advanced", "delayed"],
        correctAnswer: 0,
        type: "MCQ",
        marks: 1
      },
      {
        id: 3,
        question: "Choose the correct indirect speech: She said, 'I will help you.'",
        options: [
          "She said that she will help me",
          "She said that she would help me",
          "She said that she helps me",
          "She said that she helped me"
        ],
        correctAnswer: 1,
        type: "MCQ",
        marks: 2
      },
      {
        id: 4,
        question: "Identify the meaning of 'To spill the beans':",
        options: ["To waste food", "To reveal a secret", "To cook beans", "To make a mess"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 2
      },
      {
        id: 5,
        question: "Choose the antonym of 'GREGARIOUS':",
        options: ["Social", "Outgoing", "Solitary", "Friendly"],
        correctAnswer: 2,
        type: "MCQ",
        marks: 1
      },
      {
        id: 6,
        question: "Select the correct form: 'The number of students _____ increasing.'",
        options: ["are", "is", "were", "have been"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 2
      },
      {
        id: 7,
        question: "Choose the correct spelling:",
        options: ["Embarass", "Embarrass", "Embaras", "Embarrase"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 1
      },
      {
        id: 8,
        question: "Complete the analogy: Doctor : Hospital :: Teacher : ?",
        options: ["Student", "School", "Book", "Lesson"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 1
      },
      {
        id: 9,
        question: "Choose the synonym for 'EPHEMERAL':",
        options: ["Permanent", "Fleeting", "Eternal", "Lasting"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 2
      },
      {
        id: 10,
        question: "Identify the subject: 'Walking in the rain is refreshing.'",
        options: ["Walking", "Rain", "Refreshing", "In"],
        correctAnswer: 0,
        type: "MCQ",
        marks: 1
      }
    ]
  }
  // Add more sections: qa, aa, sa with similar structure
};

export const getGAMockTestQuestions = (section, testId) => {
  const sectionKey = section.toLowerCase();
  if (gaMockTestQuestions[sectionKey] && gaMockTestQuestions[sectionKey][testId]) {
    return gaMockTestQuestions[sectionKey][testId];
  }
  
  // Return default questions if section/test not found
  // For sections not yet implemented, return Verbal Aptitude questions
  return gaMockTestQuestions.va[1];
};

export default gaMockTestQuestions;
