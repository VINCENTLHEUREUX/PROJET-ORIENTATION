CREATE TABLE Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Email VARCHAR(255) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    Nom VARCHAR(100) NOT NULL,
    Prenom VARCHAR(100) NOT NULL,
    DateInscription DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ProgramsInfo (
    Program VARCHAR(3) PRIMARY KEY,
    ProgramName VARCHAR(100) NOT NULL,
    ProgramDescription TEXT
);

CREATE TABLE Questions (
    QuizID INT NOT NULL,
    QuestionID INT NOT NULL,
    QuestionText TEXT NOT NULL,
    QuestionProgram VARCHAR(3) NOT NULL,
    PRIMARY KEY (QuizID, QuestionID),
    FOREIGN KEY (QuestionProgram) REFERENCES ProgramsInfo(Program)
);

CREATE TABLE QuizResults (
    ResultID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    DateTest DATETIME NOT NULL,
    ScoreAER DECIMAL(5,2) DEFAULT 0,
    ScoreCTN DECIMAL(5,2) DEFAULT 0,
    ScoreELE DECIMAL(5,2) DEFAULT 0,
    ScoreLOG DECIMAL(5,2) DEFAULT 0,
    ScoreMEC DECIMAL(5,2) DEFAULT 0,
    ScoreGOL DECIMAL(5,2) DEFAULT 0,
    ScoreGPA DECIMAL(5,2) DEFAULT 0,
    ScoreGTI DECIMAL(5,2) DEFAULT 0,
    ScoreDSN DECIMAL(5,2) DEFAULT 0,
    ScoreIND DECIMAL(5,2) DEFAULT 0,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

CREATE INDEX idx_quiz_results_user ON QuizResults(UserID);
CREATE INDEX idx_quiz_results_date ON QuizResults(DateTest);

INSERT INTO ProgramsInfo (Program, ProgramName, ProgramDescription) VALUES
('AER', 'Génie Aérospatial', 'Étude de la conception et du développement des aéronefs et des véhicules spatiaux'),
('CTN', 'Génie Civil', 'Conception et construction de l\'environnement bâti, y compris les bâtiments, les routes et les ponts'),
('ELE', 'Génie Électrique', 'Étude des systèmes électriques, de l\'électronique et des télécommunications'),
('LOG', 'Génie Logistique', 'Étude de la gestion et de l\'optimisation de la chaîne d\'approvisionnement'),
('MEC', 'Génie Mécanique', 'Étude des systèmes mécaniques, de la fabrication et des matériaux'),
('GOL', 'Génie des Opérations et de la Logistique', 'Étude de l\'amélioration des processus d\'affaires et des opérations'),
('GPA', 'Génie des Procédés', 'Conception et optimisation des processus chimiques et biochimiques'),
('GTI', 'Génie des Technologies de l\'Information', 'Étude des systèmes informatiques, du développement logiciel et des réseaux'),
('DSN', 'Génie de la Conception', 'Étude de la conception de produits, de l\'expérience utilisateur et de l\'innovation'),
('IND', 'Génie Industriel', 'Optimisation des processus complexes, des systèmes et des organisations');