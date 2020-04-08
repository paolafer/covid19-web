const messages = {
    'en': {
      sirModelParagraph1:
        `Let's start assuming that an infection such as COVID-19 is due to a pathogen that produces the disease during a certain amount of time, followed by immunity.
         Let's now divide the population in three groups. "Susceptible" (S), "Infectious" (I) and "Recovered" (R).
         This division is also the name of the model, SIR [W. O. Kermack and A. G. McKendrick, Proc. R. Soc. A 115, 700 (1927).].
         The simplest version of the model does not take into account demography (births or deaths not related with the epidemic, as well as migration flows) and includes the deceased in the "Recovered" category.
         How do individuals move within these three categories? A person who is susceptible to be infected can only stay in his box or move to the "Infectious" box.
         In turn, an infectious can only remain so for a certain amount of time (which we'll call "infection period", T) and, later, becomes "Recovered" (even if he dies).
         To further simplify, we can assume that the infection period (therefore its inverse, which we call recovery rate  \\(\\gamma\\)), is a constant of the pathogen.
In the coronavirus case, T ~7 days ( \\(\\gamma\\) ~1/7 recoveries per day).`,
      sirModelParagraph2:
        ` The figure shows the movement among categories.
          The step from S to I involves the disease transmission and is proportional to three quantities:
          the first two are the number of susceptible and the number of infectious (it's easy to understand this proportionality: if there are no susceptible to infection, or infectious transmitting it, there's no illness propagation).
        The third one is a quantity \\(\\beta\\) which represents the product of the contact rate (the number of times an infectious meets a susceptible) times the transmission probability.
        The number of people susceptible of being infected (S) decreases with time, and the number of infectious increases by the same factor. In mathematical notation, we write the variation of a quantity S with time (t) as dS/dt ("how much S changes with t"). Therefore:`,
      sirModelParagraph3:
        `The fraction of infectious increases to the extent that the fraction of susceptible decreases.
         If infectious never recovered, we would simply have \\(dI/dt = \\beta SI\\).
        On the other hand, a part of the infectious recovers, with a recovery rate \\(\\gamma\\) (the inverse of the recovery period). Therefore:`,

      sirModelParagraph4:
        `Finally, the number of recovered as a function of time is exactly the quantity that is subtracted from the infectious group, that is:`,

      sirModelParagraph5:
        `Equations (1), (2) and (3) specify the simplest SIR model and define how the three populations (S, I and R) evolve over time depending on two parameters, \\(\\beta\\) and \\(\\gamma\\).
       On the other hand, it is more intuitive to use the infection time (T = 1/\\(\\gamma\\) ) and the disease reproduction number, \\(R_0\\), which is defined by the average number of people infected by one sick person (\\(R_0 = \\beta/\\gamma\\)).`,

      sirModelParagraph6:
        `The interactive program enables the study of the evolution of the three populations according to T and \\(R_0\\).
        The results can be presented in terms of the relative fraction of the population or in absolute terms if the total number of the population, N, is specified.
        The fraction of people in quarantine can also be varied (containment measures).
        If 100% of the population is in quarantine the epidemic disappears, whereas for values between 0% and 100% the curve flattens out (there are also controls in order to display the total infection time).`,

      sirModelParagraph7:
        `As an example, we can start by setting the parameters to the following values: \\(R_0=3.5, T = 5\\) days (which are consistent with the values determined by various epidemiological studies).
        N = 47 million (approximate population of Spain), Q=0 (there is no population in quarantine) and tf=100 (to get a good look at the time scale).
        The model tells us that the peak of infection is reached after approximately 25 days and the number of people infected on that day is 1.5 million.
        After 45 days the disease will run out, as most of the population (42 million) has been infected and has recovered (remember that SIR counts deaths as “recovered”).`,

      sirModelParagraph8:
        `If then we set Q at an intermediate value (Q = 50 %) and extend the time scale to 150 days (tf = 150) we can see that the infection curve “flattens out”, the peak is reached much later (after 70 days) and it is lower (half a million).
        Even so, at the end the infected fraction of the population remains high (of the order of 70%, we can see it by removing the click of the “absolute” box).`,

      sirModelParagraph9:
        `For large enough Q values (~70%) we can see that the infection disappears… but do not forget that this simple version of the model does not take into account a possible rebound.`,
    },
    'es': {
      sirModelParagraph1:
        `Empecemos por asumir que una infección como la COVID-19 es debida a un patógeno que produce la enfermedad durante un cierto periodo de tiempo, seguido de inmunidad.
        A continuación dividamos la población en tres grupos. "Susceptibles" (S), "Infectados" (I) y "Recuperados" (R).
        Esta división en tres categorías da nombre al modelo, que se denomina SIR [W. O. Kermack and A. G. McKendrick, Proc. R. Soc. A 115, 700 (1927).].
        La versión más elemental del modelo ignora la demografía (nacimientos o muertes no relacionados con la epidemia, así como movimientos migratorios) e incluye en la categoría de "Recuperados" a las personas fallecidas.
        ¿Cómo se mueven los individuos entre estas tres categorías? Una persona susceptible de ser infectada sólo puede quedarse en su casilla o desplazarse a la casilla de "Infectado".
        A su vez, un infectado sólo puede permanecer como tal un cierto tiempo (al que llamaremos "periodo de infección", T)  y luego se convierte en "Recuperado" (incluso si muere).
        Otra simplificación útil que podemos añadir es asumir que el periodo de infección (y por tanto también su inversa, una cantidad a la que llamamos tasa de recuperación, \\(\\gamma\\)), es una constante del patógeno en cuestión.
        En el caso del corona virus, T ~7 días ( \\(\\gamma\\) ~1/7 recuperaciones por día).`,
      sirModelParagraph2:
        `La figura ilustra la progresión entre las categorías.
        El paso de S a I involucra la transmisión de la enfermedad y es proporcional a tres cantidades:
        las dos primeras son el número de susceptibles y el número de infectados (es fácil ver esta proporcionalidad: si no hay susceptibles a los que propagar la infección o infecciosos que la transmitan, no hay propagación de la enfermedad).
        La tercera es una cantidad \\(\\beta\\) que representa el producto de la tasa de contactos (el número de veces que un infeccioso encuentra a un susceptible) veces la probabilidad de transmisión.
        El número de personas susceptibles de ser infectadas (S) disminuye con el tiempo en la misma proporción que aumenta el número de infectados. En notación matemática, escribimos la variación de una cantidad S con el tiempo (t) como dS/dt ("lo que varía S  con t"). Por tanto:`,
      sirModelParagraph3:
        `A medida que la fracción de susceptibles disminuye, la fracción de infectados aumenta.
        Si los infectados no se recuperaran nunca, tendríamos simplemente que \\(dI/dt = \\beta SI\\).
        Por otra parte, una parte de los infectados deja de serlo, con una tasa de recuperación \\(\\gamma\\) (la inversa del periodo de recuperación). Por tanto:`,

      sirModelParagraph4:
        `Finalmente, el número de recuperados en función del tiempo es precisamente lo que le sustraemos del grupo de infectados, esto es:`,

      sirModelParagraph5:
        `Las ecuaciones (1), (2) y (3) especifican el modelo SIR más sencillo y definen como evolucionan con el tiempo las tres poblaciones (S, I y R) en función de dos parámetros, \\(\\beta\\) y \\(\\gamma\\).
        Por otra parte, es más intuitivo usar el tiempo de infección (T = 1/\\(\\gamma\\) ) y el número de reproducción de la enfermedad, \\(R_0\\) que se define como el promedio de personas que contagia un infectado (\\(R_0 = \\beta/\\gamma\\)).`,

      sirModelParagraph6:
        `El programa interactivo permite estudiar como evolucionan las tres poblaciones en función de T y \\(R_0\\).
        Los resultados pueden presentarse en términos de la fracción relativa de la población, o en términos absolutos, especificando el valor de la población total, N.
        También puede variarse la fracción de la población que está en cuarentena (medidas de contención).
        Si el 100 % o más de la población está en cuarentena la epidemia desaparece, mientras que para valores entre 0 y 100 % la curva se aplana (también hay controles para visualizar el tiempo total de la infección).`,

      sirModelParagraph7:
        `Como ejemplo, podemos empezar por fijar los parámetros a los siguientes valores: \\(R_0=3.5, T = 5\\) días (consistentes con los valores determinados por diversos estudios epidemiológicos).
        N = 47 millones (población aproximada de España), Q=0 (no hay población en cuarentena) y tf=100 (para ver bien la escala temporal).
        El modelo nos dice que el pico de la infección se alcanza hacia el día 25 y el número de infectados ese día es de 1.5 millones.
        Al cabo de 45 días las enfermedad se ha agotado, ya que la mayor parte de la población (42 millones) se ha contagiado y se ha recuperado (recordemos que SIR cuenta las defunciones como "recuperados").`,

      sirModelParagraph8:
        `Si ahora fijamos Q a un valor intermedio (Q = 50 %) y alargamos la escala de tiempo hasta 150 días (tf = 150) vemos que la curva de infección "se aplana", el pico llega mucho más tarde (a los 70 días) y es más bajo (medio millón).
        Aún así, la fracción de la población que se infecta al final es alta (del orden del 70%, podemos verlo quitando el click de la casilla "absolute").`,

      sirModelParagraph9:
        `Para valores de Q lo bastante grandes (~70 %) podemos ver que la infección desaparece... pero no olvidar que esta versión simple del modelo no toma en cuenta un posible repunte.`,
    }
};

export default messages;
