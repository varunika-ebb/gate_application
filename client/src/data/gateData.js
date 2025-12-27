export const gatePapers = {
  AE: { name: "Aerospace Engineering", category: "Engineering" },
  AG: { name: "Agricultural Engineering", category: "Engineering" },
  AR: { name: "Architecture and Planning", category: "Engineering" },
  BT: { name: "Biotechnology", category: "Engineering" },
  BM: { name: "Bio-medical Engineering", category: "Engineering" },
  CE: { name: "Civil Engineering", category: "Engineering" },
  CH: { name: "Chemical Engineering", category: "Engineering" },
  CS: { name: "Computer Science & Information Technology", category: "Engineering" },
  CY: { name: "Chemistry", category: "Science" },
  EC: { name: "Electronics and Communication Engineering", category: "Engineering" },
  EE: { name: "Electrical Engineering", category: "Engineering" },
  XE: { name: "Engineering Sciences", category: "Engineering" },
  PE: { name: "Petroleum Engineering", category: "Engineering" },
  GE: { name: "Geomatics Engineering", category: "Engineering" },
  GG: { name: "Geology and Geophysics", category: "Science" },
  IN: { name: "Instrumentation Engineering", category: "Engineering" },
  XL: { name: "Life Sciences", category: "Science" },
  MA: { name: "Mathematics", category: "Science" },
  ME: { name: "Mechanical Engineering", category: "Engineering" },
  MN: { name: "Mining Engineering", category: "Engineering" },
  MT: { name: "Metallurgical Engineering", category: "Engineering" },
  NM: { name: "Naval Architecture & Marine Engineering", category: "Engineering" },
  PH: { name: "Physics", category: "Science" },
  PI: { name: "Production and Industrial Engineering", category: "Engineering" },
  TF: { name: "Textile Engineering & Fibre Science", category: "Engineering" },
  EY: { name: "Ecology and Evolution", category: "Science" },
  ST: { name: "Statistics", category: "Science" },
  ES: { name: "Environmental Science and Engineering", category: "Engineering" },
  XH: { name: "Humanities and Social Sciences", category: "Humanities" },
  DA: { name: "Data Science & Artificial Intelligence", category: "Engineering" }
};

export const allowedCombinations = {
  AE: ["CE", "ME", "XE"],
  AG: ["CE"],
  AR: ["CE", "GE"],
  BM: ["BT", "IN"],
  BT: ["BM", "XL"],
  CE: ["AE", "AG", "AR", "ES", "GE", "NM", "XE"],
  CH: ["ES", "PE", "XE"],
  CS: ["DA", "EC", "GE", "MA", "PH", "ST"],
  CY: ["XE", "XL"],
  EC: ["CS", "DA", "IN", "PH", "EE"],
  EE: ["DA", "EC", "IN", "PH"],
  ES: ["CE", "CH", "GE"],
  EY: ["XL"],
  GE: ["AR", "CE", "GG", "ES", "CS"],
  GG: ["GE"],
  IN: ["BM", "EC", "EE", "ME"],
  MA: ["CS", "DA", "PH", "ST"],
  ME: ["AE", "DA", "IN", "NM", "PI", "XE"],
  MN: ["GE", "GG", "XE"],
  MT: ["XE"],
  NM: ["CE", "ME"],
  PE: ["CH"],
  PH: ["CS", "DA", "MA", "XH"],
  PI: ["ME", "XE"],
  ST: ["ME", "XE"],
  DA: ["CS", "EC", "EE", "MA", "ME", "PH", "ST", "XE"],
  XE: ["AE", "CE", "CH", "CY", "DA", "ME", "MT", "PH", "PI"],
  XH: ["ST"],
  XL: ["AE", "CE", "CH", "CY", "DA", "ME", "MT", "PH", "PI"]
};

export const questionTypes = [
  {
    type: "MCQ",
    name: "Multiple Choice Questions",
    description: "Single correct answer with negative marking",
    marking: "1-mark: -1/3 for wrong, 2-mark: -2/3 for wrong"
  },
  {
    type: "MSQ",
    name: "Multiple Select Questions",
    description: "Multiple correct answers, no negative marking",
    marking: "No negative marking, no partial marking"
  },
  {
    type: "NAT",
    name: "Numerical Answer Type",
    description: "Numerical answer input, no negative marking",
    marking: "No negative marking"
  }
];

export const examStructure = {
  standard: {
    papers: ["AE", "AG", "BM", "BT", "CE", "CH", "CS", "EC", "EE", "ES", "IN", "ME", "MN", "MT", "NM", "PE", "PI", "TF"],
    structure: {
      generalAptitude: 15,
      engineeringMath: 13,
      subjectQuestions: 72,
      total: 100,
      duration: 180
    }
  },
  special: {
    papers: ["AR", "CY", "DA", "EY", "GG", "MA", "PH", "ST", "XH", "XL"],
    structure: {
      generalAptitude: 15,
      subjectQuestions: 85,
      total: 100,
      duration: 180
    }
  },
  xe: {
    papers: ["XE"],
    structure: {
      generalAptitude: 15,
      engineeringMathXE: 15,
      subjectQuestions: 70,
      total: 100,
      duration: 180
    }
  }
};
