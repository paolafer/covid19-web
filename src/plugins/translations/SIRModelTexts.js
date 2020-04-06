const messages = {
    'en': {
      sirModelParagraph1:
        `Let's start assuming that an infection such as COVID-19 is due to a pathogen that produces the illness during a certain amount of time, followed by immunity.
         Let's now divide the population in three groups. "Susceptibles" (S), "Infectious" (I) and "Recovered" (R).
         This division is also the name of the model, SIR [W. O. Kermack and A. G. McKendrick, Proc. R. Soc. A 115, 700 (1927).].
         The simplest version of the model does not take into account demography (births or deaths not related with the epidemic, as well as migration flows) and includes the deceased in the "Recovered" category.
         How do individuals move within these three categories? A person who is susceptible to be infected can only stay in his box or move to the "Infectious" box.
         In turn, an infectious can only remain so for a certain amount of time (which we'll call "infection period", T) and, later, becomes "Recovered" (even if he dies).
         To further simplify, we can assume that the infection period (therefore its inverse, which we call recovery rate  \\(\\gamma\\)), is a constant of the pathogen in question).
In the coronavirus case, T ~7 days ( \\(\\gamma\\) ~1/7 recoveries per day).`,
      sirModelParagraph2:
        `La figura ilustra la progresión entre las categorías.
        El paso de S a I involucra la transmisión de la enfermedad y es proporcional a tres cantidades:
        las dos primeras son el número de susceptibles y el número de infectados (es fácil ver esta proporcionalidad: si no hay susceptibles a los que propagar la infección o infecciosos que la transmitan, no hay propagación de la enfermedad).
        La tercera es una cantidad \\(\\beta\\) que representa el producto de la tasa de contactos (el número de veces que un infeccioso encuentra a un susceptible) veces la probabilidad de transmisión.
        El número de personas susceptibles de ser infectadas (S) disminuye con el tiempo en la misma proporción que aumenta el número de infectados. En notación matemática, escribimos la variación de una cantidad S con el tiempo (t) como dS/dt ("lo que varía S  con t"). Por tanto:`,
      sirModelParagraph3:
        `A medida que la fracción de susceptibles disminuye, la fracción de infectados aumenta.
        Si los infectados no se recuperaran nunca, tendríamos simplemente que \\(dI/dt = \\beta SI\\).
        Por otra parte, una parte de los infectados deja de serlo, con una tasa e recuperación \\(\\gamma\\) (la inversa del periodo de recuperación). Por tanto:`,

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
        Por otra parte, una parte de los infectados deja de serlo, con una tasa e recuperación \\(\\gamma\\) (la inversa del periodo de recuperación). Por tanto:`,

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
