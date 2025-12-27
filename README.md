# GATE Quiz App

A comprehensive React-based web application for GATE (Graduate Aptitude Test in Engineering) exam preparation. This app provides detailed information about all 30 GATE papers, question types, marking schemes, and interactive paper selection for quiz preparation.

## Features

### 🎯 Complete GATE Coverage
- All 30 GATE papers (AE, AG, AR, BT, BM, CE, CH, CS, CY, EC, EE, XE, PE, GE, GG, IN, XL, MA, ME, MN, MT, NM, PH, PI, TF, EY, ST, ES, XH, DA)
- Detailed paper information with full names and categories
- Allowed second paper combinations as per GATE guidelines

### 📝 Question Types & Marking
- **MCQ (Multiple Choice Questions)**: Single correct answer with negative marking
- **MSQ (Multiple Select Questions)**: Multiple correct answers, no negative marking
- **NAT (Numerical Answer Type)**: Numerical input, no negative marking
- Detailed marking scheme explanation for each type

### 📊 Exam Structure
- Dynamic exam structure based on selected paper
- Three different structures:
  - Standard Engineering Papers (with Engineering Mathematics)
  - Special Papers (Science/Humanities without separate Engineering Math)
  - XE Paper (with mandatory XE-A section)
- Mark distribution breakdown
- Time allocation information

### 🎨 Modern UI/UX
- Responsive design for all devices
- Interactive paper selection with visual feedback
- Gradient backgrounds and smooth animations
- Card-based layout for better information organization
- Hover effects and transitions

## Technology Stack

- **Frontend**: React 18.2.0
- **Routing**: React Router DOM 6.8.0
- **Styling**: CSS3 with modern features (Grid, Flexbox, Gradients)
- **Build Tool**: Create React App

## Project Structure

```
src/
├── components/
│   ├── Home.js              # Main home page component
│   ├── Header.js            # Navigation header
│   ├── Hero.js              # Hero section with CTA
│   ├── PaperSelector.js     # Interactive paper selection
│   ├── QuestionTypes.js     # Question types explanation
│   ├── ExamStructure.js     # Exam structure details
│   ├── Stats.js             # GATE statistics
│   ├── Footer.js            # Footer with links
│   ├── PaperSelector.css    # Paper selector styles
│   ├── QuestionTypes.css    # Question types styles
│   └── ExamStructure.css    # Exam structure styles
├── data/
│   └── gateData.js          # GATE papers and exam data
├── App.js                   # Main app component
├── App.css                  # Global styles
├── index.js                 # App entry point
└── index.css                # Base styles
```

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Gate_Quiz_App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## GATE Paper Information

### Engineering Papers
AE, AG, BM, BT, CE, CH, CS, EC, EE, ES, IN, ME, MN, MT, NM, PE, PI, TF

### Science Papers
CY, GG, MA, PH, ST, XL, EY

### Special Papers
AR (Architecture), DA (Data Science), XH (Humanities), XE (Engineering Sciences)

### Exam Pattern
- **Duration**: 180 minutes (3 hours)
- **Total Marks**: 100
- **Total Questions**: 65
- **Sections**: General Aptitude (15 marks) + Subject-specific questions

## Future Enhancements

- [ ] Quiz functionality with timer
- [ ] Question bank integration
- [ ] Performance analytics
- [ ] Mock test series
- [ ] Previous year papers
- [ ] Study materials integration
- [ ] User authentication
- [ ] Progress tracking
- [ ] Leaderboards

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- GATE official guidelines and structure
- React community for excellent documentation
- Modern CSS techniques for responsive design
