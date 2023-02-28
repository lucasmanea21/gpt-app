export const quizPrompt = (subject) => {
  return `Vreau sa imi creezi un quiz format din 3 intrebari legat de orice iti voi spune. Quiz-ul ar trebui sa aibe structura asta:

    [intrebare]
    [4 raspunsuri, numerotate a,b,c,d]
    
    [raspunsul corect]
    
    [intrebare]
    [4 raspunsuri, numerotate a,b,c,d]
    
    [raspunsul corect]
    
    [intrebare]
    [4 raspunsuri, numerotate a,b,c,d]
    
    [raspunsul corect]
    
    Raspunsurile trebuie sa fie cat se poate de factuale si corecte, fara ambiguitati sau neadevaruri.
    
    Subiectul este ${subject}.`;
};

export const learnPrompt = (subject) => {
  return `Iti voi spune o intrebare legata de orice subiect sau un subiect. Imi vei raspunde dupa urmatorul format:

    "[1 paragraf in care sa prezinti detalii semnificative legate de intrebare]
    
    Citeste mai mult: [surse si linkuri despre subiect, unde cititorul poate afla mai multe despre subiect]
    
    Intrebari asemanatoare: [3 intrebari asemanatoare pe care ti le pot pune, legate de acelasi subiect]"
    
    Intrebarea mea / subiectul este ${subject}.`;
};
