/* ============================================
   MediLearn — Quiz Engine
   ============================================ */

'use strict';

// ============================================
// Quiz Data
// ============================================
const quizData = [
  // ─── ASMA ────────────────────────────────
  {
    id: 1,
    disease: 'asma',
    scenario: 'Niña de 8 años es traída a consulta por su madre quien refiere que la niña presenta episodios nocturnos de tos seca y sibilancias desde hace 6 meses. La madre tiene rinitis alérgica. Los episodios mejoran notablemente con nebulización de salbutamol. La espirometría muestra reversibilidad post-broncodilatador. Pruebas cutáneas positivas para ácaros del polvo.',
    question: '¿Cuál es el fenotipo de asma más probable en esta paciente?',
    options: [
      'Asma no alérgica',
      'Asma alérgica / Atópica',
      'Asma ocupacional',
      'Asma por ejercicio'
    ],
    correctIndex: 1,
    explanation: 'La presencia de antecedentes familiares de atopia (rinitis alérgica materna), inicio en la infancia, sensibilización a alérgenos (ácaros) y respuesta favorable al broncodilatador son características clásicas del fenotipo alérgico/atópico. Este es el fenotipo más común en niños y se asocia a niveles elevados de IgE y eosinofilia.',
    reference: 'GINA 2024 — Asma alérgica: fenotipo más frecuente, inicio temprano, mediado por IgE.'
  },
  {
    id: 2,
    disease: 'asma',
    scenario: 'Corredor de 25 años, sin antecedentes atópicos, refiere sibilancias y disnea que aparecen sistemáticamente a los 5-10 minutos de iniciar ejercicio intenso. Los síntomas desaparecen solos a los 20-30 minutos de cesar el esfuerzo. La espirometría basal es completamente normal. El test de metacolina es positivo.',
    question: '¿Cuál es el diagnóstico más probable?',
    options: [
      'Asma alérgica inducida por ejercicio',
      'Asma inducida por ejercicio (AIE)',
      'EPOC de inicio temprano',
      'Síndrome de hiperventilación'
    ],
    correctIndex: 1,
    explanation: 'El ejercicio intenso produce hiperventilación que genera enfriamiento y deshidratación de la mucosa de las vías aéreas, lo que activa mastocitos y eosinófilos provocando broncoespasmo. La espirometría normal en reposo y la aparición sistemática post-ejercicio son hallazgos clásicos del Asma Inducida por Ejercicio (AIE). El test de metacolina positivo confirma hiperreactividad bronquial.',
    reference: 'GINA 2024 — Asma inducida por ejercicio: broncoespasmo desencadenado por hiperosmolaridad y enfriamiento de vías aéreas.'
  },
  {
    id: 3,
    disease: 'asma',
    scenario: 'Paciente de 42 años con diagnóstico previo de asma bronquial refiere que tras iniciar ibuprofeno por dolor lumbar presentó un episodio de broncoespasmo severo con rinorrea intensa. Al revisar su historia clínica, se encuentra que fue intervenido hace 2 años de poliposis nasal bilateral. Los síntomas de asma son difíciles de controlar.',
    question: '¿Qué síndrome describe mejor este cuadro clínico?',
    options: [
      'Síndrome de Churg-Strauss',
      'Síndrome de Samter (Tríada de Samter)',
      'Asma ocupacional',
      'Síndrome de Löffler'
    ],
    correctIndex: 1,
    explanation: 'El Síndrome de Samter (también llamado Tríada ASA) consiste en la combinación de: asma bronquial + poliposis nasal + intolerancia a AINEs (especialmente aspirina e ibuprofeno). El mecanismo implica la inhibición de COX-1 que desvía el ácido araquidónico hacia la vía de las lipoxigenasas, produciendo exceso de leucotrienos broncoconstrictores. Es una contraindicación absoluta para AINEs.',
    reference: 'Samter M, Beers RF. Intolerance to aspirin. Ann Intern Med. 1968;68(5):975-983.'
  },
  {
    id: 4,
    disease: 'asma',
    scenario: 'Mujer de 35 años con asma refiere síntomas diarios (tos, sibilancias, disnea), despertares nocturnos 3-4 veces por semana y limitación de actividades físicas habituales. La espirometría muestra: VEF1/CVF < 0.70 y VEF1 del 62% del valor predicho.',
    question: '¿Cuál es la clasificación GINA correcta para esta paciente?',
    options: [
      'Asma leve intermitente',
      'Asma persistente leve',
      'Asma persistente moderada',
      'Asma persistente grave'
    ],
    correctIndex: 2,
    explanation: 'La clasificación GINA de persistente moderada requiere: síntomas diarios, despertares nocturnos > 1 vez/semana y VEF1 entre 60-79% del predicho. Esta paciente cumple todos los criterios: síntomas diarios, despertares frecuentes y VEF1 62%. Requeriría tratamiento de mantenimiento en Escalón 3 o 4 de la escalera terapéutica GINA.',
    reference: 'GINA 2024 — Clasificación de severidad: moderada persistente requiere VEF1 60-79% predicho y síntomas diarios.'
  },
  {
    id: 5,
    disease: 'asma',
    scenario: 'Durante una crisis de asma moderada, se administra salbutamol en aerosol. A los pocos minutos, el paciente refiere mejoría de la disnea y las sibilancias disminuyen considerablemente. Una nueva medición del flujo espiratorio máximo muestra incremento del 22%.',
    question: '¿Cuál es el mecanismo de acción del salbutamol?',
    options: [
      'Antagonista muscarínico — bloquea receptores M3 bronquiales',
      'Agonista beta-2 adrenérgico selectivo → broncodilatación por relajación del músculo liso',
      'Inhibidor de fosfodiesterasa → aumento AMPc intracelular',
      'Antagonista de leucotrienos → bloquea CysLT1'
    ],
    correctIndex: 1,
    explanation: 'El salbutamol (albuterol) es un agonista selectivo de los receptores beta-2 adrenérgicos del músculo liso bronquial. Su unión activa la adenilciclasa → incrementa AMPc → activa PKA → fosforilación de la miosina → relajación del músculo liso → broncodilatación. Es el broncodilatador de alivio (SABA) de primera línea en crisis aguda por su inicio rápido de acción (2-5 minutos) y duración de 4-6 horas.',
    reference: 'Barnes PJ. Beta-adrenergic receptors and their regulation. Am J Respir Crit Care Med. 1995;152(3):838-860.'
  },

  // ─── EPOC ────────────────────────────────
  {
    id: 6,
    disease: 'epoc',
    scenario: 'Hombre de 55 años, fumador de 30 paquetes-año, consulta por tos con expectoración mucopurulenta matutina presente durante más de 3 meses al año en los últimos 3 años consecutivos. No refiere disnea significativa en reposo. La espirometría post-broncodilatador muestra VEF1/CVF = 0.68 (menor de 0.70).',
    question: '¿Cuál es el diagnóstico más preciso según los criterios establecidos?',
    options: [
      'Asma bronquial del adulto',
      'Bronquitis crónica según criterios ATS (asociada a EPOC)',
      'Fibrosis quística del adulto',
      'Bronquiectasias primarias'
    ],
    correctIndex: 1,
    explanation: 'La bronquitis crónica se define según criterios de la American Thoracic Society (ATS) como la presencia de tos productiva durante más de 3 meses por año en 2 o más años consecutivos, sin otra causa que lo explique. La combinación con VEF1/CVF < 0.70 post-broncodilatador confirma la obstrucción crónica del flujo aéreo, estableciendo el diagnóstico de EPOC con fenotipo bronquitis crónica.',
    reference: 'GOLD 2024 — Definición ATS de bronquitis crónica y criterio diagnóstico de EPOC (VEF1/CVF < 0.70).'
  },
  {
    id: 7,
    disease: 'epoc',
    scenario: 'Paciente de 67 años con EPOC diagnosticada. Espirometría post-BD: VEF1 = 42% del predicho, VEF1/CVF < 0.70. Refiere disnea al subir un piso de escaleras (mMRC 2). En el último año tuvo 1 exacerbación que requirió hospitalización.',
    question: '¿Cuál es la clasificación GOLD correcta para este paciente?',
    options: [
      'GOLD 2 (Moderado), Grupo B',
      'GOLD 3 (Grave), Grupo E',
      'GOLD 3 (Grave), Grupo B',
      'GOLD 4 (Muy Grave), Grupo E'
    ],
    correctIndex: 1,
    explanation: 'Según GOLD 2024: el VEF1 42% del predicho clasifica al paciente en GOLD 3 (Grave: VEF1 30-49%). Para los grupos ABCE, se evalúan síntomas (mMRC ≥ 2 o CAT ≥ 10) y exacerbaciones. Con 1 hospitalización en el último año, corresponde al Grupo E (riesgo alto de exacerbaciones). La clasificación completa es GOLD 3 - Grupo E.',
    reference: 'GOLD 2024 — GOLD 3: VEF1 30-49%. Grupo E: ≥ 2 exacerbaciones o ≥ 1 hospitalización/año.'
  },
  {
    id: 8,
    disease: 'epoc',
    scenario: 'Hombre de 42 años, no fumador, con disnea progresiva de 5 años de evolución. Tomografía muestra enfisema panacinar (afecta toda la longitud del acino, predominio en bases). Función hepática alterada. Su hermano tiene el mismo cuadro pulmonar.',
    question: '¿Qué déficit debe investigarse prioritariamente?',
    options: [
      'Déficit de IgA secretora',
      'Déficit de alfa-1 antitripsina (DAAT)',
      'Déficit de surfactante pulmonar',
      'Déficit de proteína C activada'
    ],
    correctIndex: 1,
    explanation: 'El Déficit de Alfa-1 Antitripsina (DAAT) debe sospecharse en pacientes con EPOC de inicio temprano (< 45 años), no fumadores o con historia mínima de tabaquismo, enfisema panacinar de predominio basal, enfermedad hepática concomitante (cirrosis) y antecedentes familiares. La alfa-1 antitripsina inhibe la elastasa neutrofílica; su deficiencia permite la destrucción del parénquima pulmonar.',
    reference: 'GOLD 2024 — DAAT: sospecha en EPOC < 45 años, no fumador, enfisema panacinar basal, hepatopatía.'
  },
  {
    id: 9,
    disease: 'epoc',
    scenario: 'Paciente con EPOC GOLD 4 en urgencias por exacerbación severa. SaO2 82%. El médico de turno inicia oxígeno a alto flujo (FiO2 100%) y a los 30 minutos el paciente está más somnoliento y la gasometría muestra PCO2 68 mmHg (antes 52 mmHg). pCO2 basal del paciente era 52 mmHg.',
    question: '¿Por qué debe controlarse el aporte de oxígeno en EPOC grave (mantener SaO2 88-92%)?',
    options: [
      'El O2 es directamente tóxico para el tejido pulmonar dañado',
      'El oxígeno elimina el estímulo hipóxico ventilatorio → hipercapnia y retención de CO2',
      'Causa vasodilatación pulmonar excesiva',
      'Produce hipotensión sistémica por vasodilatación'
    ],
    correctIndex: 1,
    explanation: 'En pacientes con EPOC grave con hipercapnia crónica, el centro respiratorio se adapta y pierde sensibilidad al CO2. El estímulo principal para respirar pasa a ser la hipoxemia (estímulo hipóxico). Si se administra O2 en exceso y se corrige la hipoxia, se elimina este estímulo hipóxico, reduciendo el impulso ventilatorio → hipoventilación → retención de CO2 → hipercapnia → narcosis por CO2. Por esto se mantiene SaO2 88-92%.',
    reference: 'GOLD 2024 — O2 controlado en EPOC: riesgo de hipercapnia por supresión del estímulo hipóxico.'
  },
  {
    id: 10,
    disease: 'epoc',
    scenario: 'Se presentan dos pacientes con EPOC avanzado. Paciente A: delgado, muy disneico, usa musculatura accesoria, postura en trípode, no cianótico, labios fruncidos al espirar. Paciente B: obeso, pletórico, cianótico, con edemas y cor pulmonale, menor percepción de disnea.',
    question: '¿Cuál de los dos fenotipos corresponde al "Pink Puffer" (soplador rosado) del enfisema?',
    options: [
      'Paciente B — Blue Bloater (abotagado azul)',
      'Paciente A — Pink Puffer (soplador rosado)',
      'Ambos son Pink Puffer',
      'Ninguno corresponde a un fenotipo clínico definido'
    ],
    correctIndex: 1,
    explanation: 'El "Pink Puffer" corresponde al fenotipo enfisema: paciente delgado, muy disneico (puffer), sin cianosis (pink por hiperventilación compensatoria que mantiene oxigenación). Usa musculatura accesoria, postura en trípode y labios fruncidos. El "Blue Bloater" corresponde a bronquitis crónica: cianótico (blue), con hipercapnia aceptada, obeso, edemas por cor pulmonale y menor percepción de disnea.',
    reference: 'GOLD 2024 — Fenotipos EPOC: Pink Puffer (enfisema) vs Blue Bloater (bronquitis crónica).'
  },

  // ─── TBC ─────────────────────────────────
  {
    id: 11,
    disease: 'tbc',
    scenario: 'Inmigrante de 30 años proveniente de zona endémica, consulta por tos productiva de 4 semanas de evolución con hemoptisis, sudoración nocturna profusa y pérdida de 8 kg en 2 meses. Radiografía: infiltrados en lóbulos superiores con cavitación. Baciloscopía en esputo: BAAR positivo (++).',
    question: '¿Cuál es el diagnóstico y el tratamiento inicial correcto?',
    options: [
      'Neumonía bacteriana — Amoxicilina-clavulanato 7 días',
      'TB activa pulmonar — Fase inicial HRZE (2 meses): Isoniazida + Rifampicina + Pirazinamida + Etambutol',
      'TB latente — Isoniazida preventiva 9 meses',
      'Micosis pulmonar — Anfotericina B'
    ],
    correctIndex: 1,
    explanation: 'El cuadro es clásico de TB activa pulmonar: síntomas constitucionales (pérdida de peso, sudoración nocturna), tos > 3 semanas, hemoptisis, radiografía con cavitación apical y baciloscopía positiva. El tratamiento estándar OMS para TB sensible inicia con Fase Intensiva de 2 meses con HRZE (Isoniazida + Rifampicina + Pirazinamida + Etambutol), seguida de Fase de Continuación 4 meses con HR. Total: 6 meses.',
    reference: 'OMS/ATS/IDSA — Tratamiento TB pulmonar sensible: 2HRZE + 4HR. Nahid P et al. Clin Infect Dis. 2016.'
  },
  {
    id: 12,
    disease: 'tbc',
    scenario: 'Médico interno de 28 años, trabajador en hospital de alta endemia para TB, sin síntomas respiratorios. Prueba de tuberculina (PPD): induración de 15mm a las 72 horas. Radiografía de tórax completamente normal. Test IGRA (QuantiFERON-TB Gold): positivo.',
    question: '¿Cuál es el diagnóstico y la conducta más adecuada?',
    options: [
      'TB activa pulmonar — Iniciar HRZE inmediatamente',
      'TB latente — Tratamiento: Isoniazida 9 meses o Rifampicina 4 meses',
      'Falso positivo por vacuna BCG — No requiere tratamiento',
      'Inmunidad natural — Repetir en 6 meses'
    ],
    correctIndex: 1,
    explanation: 'TB latente se define por la infección con M. tuberculosis sin enfermedad activa: PPD ≥ 10mm en personal de salud (≥ 5mm en inmunosuprimidos), sin síntomas y con radiografía normal. El IGRA positivo confirma el diagnóstico y no se afecta por la vacuna BCG (a diferencia del PPD). El tratamiento de TB latente previene la reactivación: Isoniazida 9 meses (pauta estándar) o Rifampicina 4 meses (equivalente con menos toxicidad hepática).',
    reference: 'OMS 2023 — TB latente: PPD ≥ 10mm en personal de salud. Tratamiento preventivo: INH 9m o RIF 4m.'
  },
  {
    id: 13,
    disease: 'tbc',
    scenario: 'Paciente de 48 años con TB pulmonar inicia tratamiento con HRZE. A las 2 semanas refiere visión borrosa, con dificultad para distinguir los colores rojo y verde (discromatopsia). La agudeza visual ha disminuido. Examen oftalmológico: disminución de la visión de colores y del campo visual central.',
    question: '¿Qué fármaco antituberculoso es el responsable de este efecto adverso?',
    options: [
      'Isoniazida (H) — Neuropatía periférica',
      'Etambutol (E) — Neuritis óptica retrobulbar dosis-dependiente',
      'Rifampicina (R) — Hepatotoxicidad',
      'Pirazinamida (Z) — Hiperuricemia y artralgia'
    ],
    correctIndex: 1,
    explanation: 'El Etambutol produce Neuritis Óptica Retrobulbar, efecto adverso dosis-dependiente que afecta la visión de colores (discromatopsia rojo-verde) y el campo visual central. Es reversible si se detecta temprano y se suspende el fármaco. Por eso es obligatorio el control oftalmológico basal y mensual durante el tratamiento. Dosis > 25 mg/kg/día o insuficiencia renal aumentan el riesgo.',
    reference: 'Nahid P et al. Official ATS/CDC/IDSA Guidelines. Clin Infect Dis. 2016 — Etambutol: neuritis óptica, suspender si síntomas visuales.'
  },
  {
    id: 14,
    disease: 'tbc',
    scenario: 'Mujer de 35 años con diagnóstico de TB pulmonar activa. Al iniciar el tratamiento se descubre que está embarazada de 8 semanas (primer trimestre). Se debe ajustar el esquema de tratamiento.',
    question: '¿Cuál de los siguientes fármacos está CONTRAINDICADO en el primer trimestre de embarazo?',
    options: [
      'Isoniazida (H) — categoría C, puede usarse con piridoxina',
      'Rifampicina (R) — categoría C, puede usarse',
      'Estreptomicina (S) — ototoxicidad fetal, contraindicada',
      'Pirazinamida (Z) — contraindicada por datos limitados de seguridad'
    ],
    correctIndex: 2,
    explanation: 'La Estreptomicina es el único antituberculoso claramente contraindicado en el embarazo por su ototoxicidad fetal (puede producir sordera congénita). La Pirazinamida tiene datos limitados de seguridad en embarazo (muchas guías la evitan en el primer trimestre). El esquema recomendado en embarazo es HRE en fase intensiva y continuación con HR, evitando aminoglucósidos. La Isoniazida se administra con piridoxina (B6) para prevenir neuropatía.',
    reference: 'OMS 2023 — TB en embarazo: Estreptomicina contraindicada (ototoxicidad fetal). Esquema recomendado: HRE + HR.'
  },
  {
    id: 15,
    disease: 'tbc',
    scenario: 'Paciente con TB pulmonar tratado durante 3 meses sin mejoría clínica ni bacteriológica. Se realiza cultivo con pruebas de sensibilidad: el antibiograma muestra resistencia tanto a Isoniazida como a Rifampicina. Los demás fármacos de primera línea muestran sensibilidad normal.',
    question: '¿Cómo se clasifica esta forma de tuberculosis?',
    options: [
      'TB monoresistente — solo resistente a un fármaco',
      'TB-MDR (Multidrug-Resistant TB) — resistente a Isoniazida Y Rifampicina',
      'TB-XDR (Extensively Drug-Resistant) — resistente a H, R + fluoroquinolonas e inyectables',
      'TB polirresistente — resistente a 2 fármacos de primera línea distintos a H+R'
    ],
    correctIndex: 1,
    explanation: 'La TB-MDR (Tuberculosis Multidrogoresistente) se define como la resistencia simultánea a Isoniazida (H) Y Rifampicina (R), los dos fármacos más potentes del esquema estándar. Requiere esquemas de segunda línea durante 18-24 meses. El régimen BPaL (Bedaquilina + Pretomanida + Linezolid) es el esquema más moderno y eficaz. TB-XDR implica resistencia adicional a fluoroquinolonas e inyectables de segunda línea.',
    reference: 'OMS 2023 — TB-MDR: R a H + R. Régimen BPaL (Bedaquilina + Pretomanida + Linezolid) para TB-MDR/XDR.'
  },

  // ─── COLECISTITIS ────────────────────────
  {
    id: 16,
    disease: 'colecistitis',
    scenario: 'Mujer de 45 años, obesa (IMC 34), acude a urgencias por dolor intenso en hipocondrio derecho que irradia hacia la escápula derecha, acompañado de náuseas y dos episodios de vómito. Temperatura 38.5°C, leucocitos 14.500/mm³, PCR 85 mg/L. En la exploración, signo de Murphy positivo. Ecografía: cálculos biliares con engrosamiento de pared vesicular 6mm y líquido perivesicular.',
    question: '¿Cuál es el diagnóstico más probable según los criterios de Tokyo TG18?',
    options: [
      'Cólico biliar simple sin complicaciones',
      'Colecistitis aguda calculosa — Criterios Tokyo TG18',
      'Colecistitis acalculosa',
      'Coledocolitiasis con obstrucción del colédoco'
    ],
    correctIndex: 1,
    explanation: 'Los Criterios Diagnósticos de Tokyo TG18 para colecistitis aguda requieren: A) Signos locales (Murphy positivo, masa en HD, dolor en HD), B) Signos sistémicos (fiebre, leucocitosis, PCR elevada) y C) Hallazgos imagenológicos (engrosamiento pared > 4mm, líquido perivesicular, Murphy ecográfico). Esta paciente cumple criterios A, B y C. La presencia de cálculos confirma el tipo calculoso (90-95% de casos). Las 4F de riesgo: Female, Fat, Forty, Fertile.',
    reference: 'Yokoe M et al. Tokyo Guidelines 2018 (TG18) — Criterios diagnósticos y clasificación de severidad. J Hepatobiliary Pancreat Sci. 2018.'
  },
  {
    id: 17,
    disease: 'colecistitis',
    scenario: 'Paciente de 62 años en UCI post-cirugía cardiovascular mayor (by-pass coronario). Lleva 8 días sin ingesta oral, con nutrición parenteral total. Desarrolla dolor abdominal difuso con fiebre 38.8°C y leucocitosis. La ecografía muestra vesícula biliar distendida con pared de 5mm, sin cálculos visibles en la vesícula ni en conductos.',
    question: '¿Cuál es el diagnóstico y su mecanismo fisiopatológico?',
    options: [
      'Colecistitis calculosa aguda — cálculos no detectados por ecografía',
      'Colecistitis aguda acalculosa — éstasis biliar e isquemia en paciente crítico',
      'Colangitis aguda ascendente',
      'Pancreatitis aguda post-quirúrgica'
    ],
    correctIndex: 1,
    explanation: 'La Colecistitis Acalculosa ocurre sin cálculos y representa el 5-10% de las colecistitis agudas. Es típica de pacientes críticos (UCI, quemados, trauma, postoperatorio mayor) por la combinación de: éstasis biliar (por ayuno/nutrición parenteral → bilis espesa → presión vesicular), isquemia directa (hipoperfusión esplácnica en shock o circulación extracorpórea) e infección secundaria. Tiene mayor mortalidad (hasta 30%) que la forma calculosa.',
    reference: 'Huffman JL, Schenker S. Acute acalculous cholecystitis. Clin Gastroenterol Hepatol. 2010 — UCI, ayuno, isquemia.'
  },
  {
    id: 18,
    disease: 'colecistitis',
    scenario: 'En urgencias se atiende a un paciente con sospecha de colecistitis aguda. Se solicita ecografía abdominal. Usted como médico de cabecera necesita interpretar correctamente los hallazgos para establecer el diagnóstico.',
    question: '¿Cuáles son los hallazgos ecográficos más específicos para colecistitis aguda?',
    options: [
      'Dilatación del colédoco > 8mm únicamente',
      'Signo de Murphy ecográfico + engrosamiento de pared vesicular > 4mm + líquido perivesicular',
      'Presencia de gas en vesícula biliar solamente',
      'Barro biliar en fondo de vesícula sin otras alteraciones'
    ],
    correctIndex: 1,
    explanation: 'La tríada ecográfica específica para colecistitis aguda según TG18 incluye: 1) Signo de Murphy ecográfico (dolor al comprimir la vesícula con el transductor), 2) Engrosamiento de la pared vesicular > 4mm (inflamación transmural), y 3) Líquido perivesicular (reacción peritoneal local). Además pueden verse cálculos con sombra acústica. La ecografía es la primera línea diagnóstica por su disponibilidad, bajo costo y ausencia de radiación.',
    reference: 'TG18 — Diagnóstico ecográfico: Murphy ecográfico + engrosamiento pared > 4mm + líquido perivesicular.'
  },
  {
    id: 19,
    disease: 'colecistitis',
    scenario: 'Mujer de 70 años con colecistitis aguda Grado III (Tokyo) que presenta fiebre 40°C, hipotensión, ictericia y TC muestra perforación vesicular con líquido libre peritoneal. Tiene antecedentes de insuficiencia cardíaca congestiva clase III y diabetes mellitus tipo 2.',
    question: '¿Cuál es el manejo más apropiado?',
    options: [
      'Colecistectomía laparoscópica inmediata sin necesidad de estabilización previa',
      'Estabilización hemodinámica + ATB → Colecistostomía percutánea (alto riesgo quirúrgico) o colecistectomía urgente si estable',
      'Tratamiento médico exclusivo con antibióticos sin cirugía',
      'Observación 48h y reevaluar'
    ],
    correctIndex: 1,
    explanation: 'Colecistitis Grado III (Tokyo) con disfunción orgánica requiere: estabilización hemodinámica inmediata (fluidos IV, vasopresores si shock séptico, antibióticos empíricos). En pacientes con alto riesgo quirúrgico (ICC, diabetes avanzada, sepsis), la Colecistostomía Percutánea (drenaje guiado por imagen) es el procedimiento de elección como puente terapéutico. La colecistectomía definitiva se realiza cuando el paciente esté estabilizado. La mortalidad de perforación vesicular es 30-40%.',
    reference: 'TG18 — Grado III: Control infeccioso urgente + colecistostomía percutánea en alto riesgo quirúrgico.'
  },
  {
    id: 20,
    disease: 'colecistitis',
    scenario: 'Paciente de 52 años con colecistitis aguda que se niega a recibir tratamiento quirúrgico. A pesar del manejo médico con antibióticos, a las 72 horas presenta deterioro clínico, dolor difuso en todo el abdomen, defensa muscular, vientre en tabla y signos de sepsis severa.',
    question: '¿Cuál es la complicación más temida de la colecistitis aguda no tratada adecuadamente?',
    options: [
      'Colelitiasis crónica recurrente',
      'Perforación vesicular → peritonitis biliar → sepsis → shock séptico (mortalidad 30-40%)',
      'Síndrome de Mirizzi únicamente',
      'Colecistitis crónica sin complicaciones'
    ],
    correctIndex: 1,
    explanation: 'La complicación más grave y temida de la colecistitis aguda sin tratamiento es la perforación de la pared vesicular (isquemia → necrosis → perforación), que conduce a peritonitis biliar química e infecciosa, sepsis grave y shock séptico. La mortalidad alcanza el 30-40%. Otras complicaciones incluyen: empiema vesicular, fístula bilioentérica (→ íleo biliar), Síndrome de Mirizzi (compresión colédoco) y gangrena vesicular. La colecistectomía temprana (24-72h) previene estas complicaciones.',
    reference: 'TG18 — Perforación vesicular: complicación fatal con mortalidad 30-40%. Indicación de cirugía urgente.'
  },

  // ─── DIABETES ────────────────────────────────
  {
    id: 21,
    disease: 'diabetes',
    scenario: 'Hombre de 52 años, obeso (IMC 31), asintomático, acude a chequeo anual. Glucemia en ayunas 132 mg/dL en la consulta de hoy. Se repite la prueba 5 días después y el resultado es 128 mg/dL. No presenta poliuria, polidipsia ni pérdida de peso.',
    question: '¿Cuál es el diagnóstico correcto según los criterios ADA 2024?',
    options: [
      'Glucemia en ayunas alterada (prediabetes) — requiere una sola determinación alterada',
      'Diabetes Mellitus tipo 2 — dos glucemias en ayunas ≥126 mg/dL confirman el diagnóstico',
      'Normal — los valores están dentro del rango aceptable para su edad',
      'Estado hiperosmolar hiperglucémico — glucemia >600 mg/dL necesaria para diagnóstico'
    ],
    correctIndex: 1,
    explanation: 'Los criterios ADA 2024 establecen que la Diabetes Mellitus se diagnostica con glucemia en ayunas ≥126 mg/dL en dos ocasiones separadas (cuando el paciente está asintomático). En este caso, el paciente tiene 132 y 128 mg/dL en dos determinaciones → diagnóstico confirmado de DM tipo 2. Si hubiera síntomas clásicos (poliuria, polidipsia) + glucemia ≥200 mg/dL en cualquier momento, bastaría una sola determinación. La glucemia en ayunas alterada (prediabetes) corresponde a 100-125 mg/dL.',
    reference: 'ADA Standards of Care 2024 — Criterios diagnósticos DM: glucemia ayunas ≥126 mg/dL en 2 ocasiones.'
  },
  {
    id: 22,
    disease: 'diabetes',
    scenario: 'Mujer de 28 años con DM tipo 1 de 8 años de evolución llega a urgencias con náuseas, vómitos, dolor abdominal y respiración profunda y rápida. Glucemia: 680 mg/dL, pH: 7.38, HCO₃: 22 mEq/L, cetonuria negativa, osmolaridad calculada: 338 mOsm/kg.',
    question: '¿Cuál es el diagnóstico más probable?',
    options: [
      'Cetoacidosis Diabética — glucemia >250 es suficiente para el diagnóstico',
      'Estado Hiperosmolar Hiperglucémico — glucemia >600, osmolaridad >320, sin cetosis ni acidosis',
      'Hipoglicemia severa — los síntomas abdominales son característicos',
      'DKA con pH compensado — el pH puede ser normal en fase inicial'
    ],
    correctIndex: 1,
    explanation: 'El Estado Hiperosmolar Hiperglucémico (EHH) se caracteriza por: glucemia >600 mg/dL, osmolaridad >320 mOsm/kg, pH normal (>7.30), HCO₃ normal o ligeramente reducido, y ausencia de cetosis significativa. A diferencia de la DKA, en el EHH hay suficiente insulina residual para inhibir la cetogénesis, pero no para controlar la glucemia. La deshidratación es más severa (8-10 L) y la alteración del sensorio es más frecuente. Afecta principalmente a DM tipo 2 adultos mayores.',
    reference: 'ADA 2009 / Kitabchi AE — Diferenciación DKA vs EHH: criterios de glucemia, osmolaridad y pH.'
  },
  {
    id: 23,
    disease: 'diabetes',
    scenario: 'Paciente con DKA severa llega a urgencias. Glucemia 480 mg/dL, pH 7.12, HCO₃ 8 mEq/L, anión gap 22. Al recibir los electrolitos: K+ = 2.9 mEq/L. El residente propone iniciar inmediatamente la infusión de insulina regular IV.',
    question: '¿Cuál es la acción correcta respecto al inicio de insulina?',
    options: [
      'Iniciar insulina regular IV 0.1 UI/kg/h inmediatamente — la corrección de glucemia es prioridad',
      'NO iniciar insulina hasta reponer K+ a >3.3 mEq/L — riesgo de arritmia ventricular fatal por hipopotasemia grave',
      'Iniciar insulina IM ya que el acceso IV no está disponible de inmediato',
      'Administrar bicarbonato primero para corregir el pH y luego comenzar insulina'
    ],
    correctIndex: 1,
    explanation: 'Esta es una perla clínica CRÍTICA: la insulina no debe iniciarse si el K+ sérico es <3.3 mEq/L. La insulina desplaza el potasio al interior de las células (K+ entra con glucosa), pudiendo precipitar hipopotasemia severa con arritmias ventriculares fatales (torsades de pointes, FV). La acción correcta es reponer K+ a 20-40 mEq/h IV hasta que K+ >3.3 mEq/L, y solo entonces iniciar la infusión de insulina. El K+ inicial en DKA puede estar falsamente normal o elevado por acidosis, cayendo bruscamente con el tratamiento.',
    reference: 'ADA DKA Protocol 2009 — Insulina contraindicada con K+ <3.3 mEq/L. Reponer potasio primero.'
  },
  {
    id: 24,
    disease: 'diabetes',
    scenario: 'Mujer de 45 años con antecedentes familiares de DM tipo 2, perímetro abdominal 92 cm, PA 135/88 mmHg, triglicéridos 180 mg/dL, HDL 44 mg/dL y glucemia en ayunas 105 mg/dL. Refiere fatiga crónica y acantosis nigricans en cuello.',
    question: '¿Cuántos componentes del Síndrome Metabólico (criterios IDF) presenta esta paciente y cuál es el diagnóstico?',
    options: [
      'Solo 2 componentes — no cumple criterios para síndrome metabólico (mínimo 3)',
      'Síndrome Metabólico confirmado — obesidad central (obligatoria) + 3 componentes adicionales (HTA, TG elevados, GAA)',
      'Solo tiene prediabetes — los demás hallazgos son variaciones normales',
      'Hipertensión arterial esencial aislada — sin relación con los demás hallazgos'
    ],
    correctIndex: 1,
    explanation: 'Según criterios IDF 2006, el SM requiere obesidad central (circunferencia abdominal ≥80 cm en mujeres latinoamericanas — OBLIGATORIA) más ≥2 componentes adicionales. Esta paciente tiene: ① Obesidad central (92 cm, ≥80) ② HTA (135/88, ≥130/85) ③ Triglicéridos elevados (180 mg/dL, ≥150) ④ Glucemia en ayunas alterada (105 mg/dL, ≥100). HDL 44 mg/dL está por debajo de <50 mg/dL para mujeres, sumando un 5to componente. La acantosis nigricans es signo cutáneo de resistencia insulínica.',
    reference: 'IDF Consensus 2006 — Síndrome Metabólico: obesidad central obligatoria + ≥2 componentes adicionales.'
  },
  {
    id: 25,
    disease: 'diabetes',
    scenario: 'Hombre de 58 años con DM tipo 2 de 3 años de diagnóstico, sin complicaciones cardiovasculares conocidas, HbA1c actual 7.8% con metformina 2000 mg/día a dosis máxima. TFG 72 mL/min/1.73m². Solicita consejo sobre el siguiente paso terapéutico.',
    question: '¿Cuál es el siguiente escalón terapéutico más apropiado según las guías ADA 2024?',
    options: [
      'Iniciar insulina basal directamente — es la opción más efectiva para reducir HbA1c',
      'Agregar SGLT-2 inhibidor (empagliflozina/dapagliflozina) o GLP-1 RA (semaglutida) como segunda línea',
      'Suspender metformina y cambiar a sulfonilurea como monoterapia',
      'Continuar metformina sola y reevaluar en 12 meses'
    ],
    correctIndex: 1,
    explanation: 'Según las guías ADA 2024, cuando la metformina no logra la meta de HbA1c, el siguiente paso es agregar un segundo agente. En pacientes sin enfermedad cardiovascular establecida, el SGLT-2 inhibidor (empagliflozina, dapagliflozina) o el GLP-1 RA (semaglutida, liraglutida) son opciones preferidas por sus beneficios adicionales: reducción de peso, cardioprotección y nefroprotección. La TFG 72 mL/min permite el uso de SGLT-2i (se contraindica si TFG <30) y GLP-1 RA. La insulina basal se reserva para HbA1c >10% o fracaso de múltiples agentes orales.',
    reference: 'ADA Standards of Care 2024 — Escalera terapéutica DM2: SGLT-2i o GLP-1 RA como segunda línea preferida.'
  },

  // ─── URGENCIAS ENDOCRINAS ────────────────────
  {
    id: 26,
    disease: 'urgencias',
    scenario: 'Mujer de 34 años con DM tipo 1 es encontrada inconsciente por su esposo en casa. Tenía previsto hacer ejercicio y no comió antes. La glucometría capillar muestra 32 mg/dL. Está inconsciente, no puede tragar. El esposo tiene en casa el kit de glucagón prescrito.',
    question: '¿Cuál es el manejo inmediato correcto para este episodio?',
    options: [
      'Administrar jugo de naranja por vía oral aunque esté inconsciente — es la forma más rápida',
      'Glucagón 1 mg IM o intranasal (Baqsimi 3 mg) — corrección hipoglicemia en paciente inconsciente sin acceso IV',
      'Trasladar directamente al hospital sin intervención para evitar complicaciones',
      'Insulina rápida IV para estabilizar primero la glucemia antes del glucagón'
    ],
    correctIndex: 1,
    explanation: 'En hipoglicemia severa con alteración de conciencia, NUNCA administrar nada por vía oral (riesgo broncoaspiración). El tratamiento de elección es: ① Si hay acceso IV: Dextrosa 50% (D50W) 25-50 mL IV en bolo. ② Si no hay acceso IV (domicilio, prehospitalario): Glucagón 1 mg IM en deltoides/muslo o Glucagón intranasal (Baqsimi) 3 mg. El glucagón activa la glucogenólisis hepática elevando la glucemia en 10-15 minutos. Contraindicado en hipoglicemia por alcohol (glucógeno hepático agotado) o inanición severa.',
    reference: 'ADA 2024 / Triada de Whipple — Manejo hipoglicemia severa: glucagón IM/IN en inconsciente sin acceso IV.'
  },
  {
    id: 27,
    disease: 'urgencias',
    scenario: 'Varón de 62 años con DM tipo 2 de 15 años, HbA1c crónica 11%, neuropatía periférica documentada. Consulta por úlcera plantar 1 cm en pie derecho con eritema circundante de 3 cm, tejido desvitalizado central, afebril, FC 78 lpm, leucocitos 9800/µL, sin signos sistémicos. Rx de pie: sin cambios óseos evidentes.',
    question: '¿Cuál es la clasificación IWGDF/IDSA y el manejo inicial más apropiado?',
    options: [
      'Leve (Grado 2) — ATB oral ambulatorio (amoxicilina-clavulanato) + curetaje + descarga del pie',
      'Grave (Grado 4) — requiere hospitalización urgente con vancomicina IV por sospecha MRSA',
      'Moderada (Grado 3) — hospitalización con piperacilina-tazobactam IV por eritema >2 cm',
      'No es infección — solo es úlcera neuropática sin signos de infección activa'
    ],
    correctIndex: 2,
    explanation: 'Eritema >2 cm alrededor de la úlcera clasifica como infección MODERADA (Grado 3 IDSA/IWGDF), aunque no haya signos sistémicos. La infección moderada implica extensión más allá de piel superficial o eritema significativo, requiriendo hospitalización y antibióticos IV. Pip-Tazo 4.5 g c/8h IV cubre el espectro habitual (S. aureus MSSA, estreptococo, gram negativos, anaerobios). La Rx normal NO descarta osteomielitis (visible solo con >30-50% pérdida ósea). Si no mejora en 48-72h: RM de pie para evaluar osteomielitis.',
    reference: 'IWGDF/IDSA 2023 — Infección moderada: eritema >2 cm o infección profunda sin signos sistémicos. Hospitalización + ATB IV.'
  },
  {
    id: 28,
    disease: 'urgencias',
    scenario: 'Hombre de 45 años con antecedente de hipertiroidismo de Graves conocido (sin tratamiento regular) es llevado a urgencias por agitación intensa. Al examen: T° 39.8°C, FC 148 lpm con ritmo irregular, PA 95/60 mmHg, diaforesis profusa, temblor fino generalizado y confusión marcada. Se calcula score de Burch-Wartofsky.',
    question: '¿Cuál es el diagnóstico y el primer fármaco que debe administrarse?',
    options: [
      'Sepsis — iniciar antibióticos de amplio espectro y cultivos antes de cualquier otro tratamiento',
      'Crisis tirotóxica (score ≥45) — PRIMERO Propiltiouracilo (PTU) 200 mg, luego 1 hora después el iodo',
      'Crisis tirotóxica — PRIMERO iodo para bloquear rápidamente la liberación de T3/T4',
      'Fibrilación auricular con respuesta ventricular rápida — cardioversión eléctrica urgente'
    ],
    correctIndex: 1,
    explanation: 'Score B-W: T°39.8 (25pts) + FC148 (25pts) + FA (10pts) + confusión (20pts) + hipotensión (10pts) + factor precipitante (10pts) = 100pts → Crisis tirotóxica confirmada (≥45). El orden de tratamiento es CRÍTICO: ① PTU 200mg c/4h PRIMERO (bloquea síntesis + inhibe conversión T4→T3) → ② 1 HORA DESPUÉS: iodo (Lugol 10 gotas c/8h) para inhibir liberación hormonal. Si se da iodo antes del antitiroideo, el iodo sirve de sustrato y paradójicamente aumenta la síntesis hormonal (efecto Wolff-Chaikoff no establecido).',
    reference: 'Burch HB, Wartofsky L 1993 — Score ≥45: crisis confirmada. Orden: antitiroideos → iodo (1h después) → BB → corticoides.'
  },
  {
    id: 29,
    disease: 'urgencias',
    scenario: '¿Por qué el iodo debe administrarse exactamente 1 hora DESPUÉS del antitiroideo (PTU/metimazol) en el tratamiento de la crisis tirotóxica, y no antes ni simultáneamente?',
    question: '¿Cuál es la razón fisiopatológica correcta para este intervalo obligatorio?',
    options: [
      'Para dar tiempo a que el paciente absorba el antitiroideo por vía oral antes de añadir otro fármaco',
      'El iodo es un sustrato para síntesis de hormona tiroidea — si se da antes que el antitiroideo, la peroxidasa tiroidea lo usa para fabricar MÁS T3/T4 (Efecto Jod-Basedow paradójico)',
      'El iodo destruye el tejido tiroideo y necesita que el antitiroideo lo proteja previamente',
      'Es un requisito de farmacovigilancia sin base fisiopatológica demostrada'
    ],
    correctIndex: 1,
    explanation: 'La peroxidasa tiroidea (TPO) necesita iodo como sustrato para sintetizar T3/T4. Si se administra iodo ANTES del antitiroideo, la TPO (aún activa) usa el iodo exógeno para fabricar MÁS hormonas tiroideas → empeoramiento paradójico (efecto Jod-Basedow). Al dar el PTU/metimazol PRIMERO por 1 hora, se bloquea la peroxidasa tiroidea → luego el iodo puede inhibir la LIBERACIÓN de hormonas preformadas (efecto Wolff-Chaikoff) sin riesgo de mayor síntesis. Este es uno de los errores terapéuticos más peligrosos en endocrinología de urgencias.',
    reference: 'Endocrine Society Guidelines 2016 — Crisis tirotóxica: PTU/MMI → iodo (1h después). Base: inhibir TPO antes de dar sustrato.'
  },
  {
    id: 30,
    disease: 'urgencias',
    scenario: 'Paciente con DM tipo 2 de 10 años presenta úlcera infectada en el talón. El médico de urgencias toma un hisopo de la superficie de la úlcera para cultivo y el resultado muestra Staphylococcus epidermidis, Candida albicans y flora mixta entérica. Se inicia tratamiento dirigido pero la infección progresa a los 5 días.',
    question: '¿Cuál fue el error diagnóstico-microbiológico y cuál es la técnica de cultivo correcta según las guías IWGDF 2023?',
    options: [
      'No hubo error — el cultivo con hisopo superficial es el gold standard para úlceras diabéticas',
      'El hisopo superficial captura flora contaminante de la piel, no el patógeno profundo — el cultivo correcto es biopsia tisular estéril por curetaje del fondo de la úlcera o aspirado de pus',
      'El error fue no añadir antifúngico empírico — la Candida siempre debe cubrirse en pie diabético',
      'El hisopo debió tomarse con mayor profundidad frotando más fuerte la úlcera'
    ],
    correctIndex: 1,
    explanation: 'El hisopo superficial es INADECUADO para cultivo de pie diabético infectado porque recoge flora contaminante de la piel (S. epidermidis, Candida, flora mixta) que puede no ser el agente causal de la infección profunda. La técnica correcta según IWGDF 2023 es: ① Biopsia tisular estéril por curetaje del fondo de la úlcera (tras desbridamiento) — gold standard para infección de tejidos blandos. ② Aspirado de pus con jeringa estéril si hay absceso. ③ Biopsia ósea percutánea o intraoperatoria para osteomielitis. Un cultivo incorrecto lleva a antibioticoterapia inapropiada y progresión de la infección.',
    reference: 'IWGDF Infection Guidelines 2023 — Cultivo correcto: biopsia tisular estéril. No usar hisopo superficial.'
  }
];

// ============================================
// Quiz State
// ============================================
let currentQuiz = [];
let currentIndex = 0;
let score = 0;
let answered = false;
let diseaseScores = { asma: 0, epoc: 0, tbc: 0, colecistitis: 0, diabetes: 0, urgencias: 0 };
let diseaseTotal = { asma: 0, epoc: 0, tbc: 0, colecistitis: 0, diabetes: 0, urgencias: 0 };

// ============================================
// Load Quiz
// ============================================
function loadQuiz(disease) {
  if (disease === 'todos' || !disease) {
    currentQuiz = [...quizData];
  } else {
    currentQuiz = quizData.filter(q => q.disease === disease);
  }

  // Shuffle
  currentQuiz = currentQuiz.sort(() => Math.random() - 0.5);

  currentIndex = 0;
  score = 0;
  answered = false;
  diseaseScores = { asma: 0, epoc: 0, tbc: 0, colecistitis: 0, diabetes: 0, urgencias: 0 };
  diseaseTotal = { asma: 0, epoc: 0, tbc: 0, colecistitis: 0, diabetes: 0, urgencias: 0 };

  // Count totals per disease
  currentQuiz.forEach(q => {
    diseaseTotal[q.disease] = (diseaseTotal[q.disease] || 0) + 1;
  });

  renderQuestion();
  updateProgress();
}

// ============================================
// Render Question
// ============================================
function renderQuestion() {
  const container = document.getElementById('quiz-question-container');
  const resultsEl = document.getElementById('quiz-results');
  const navEl = document.getElementById('quiz-nav');

  if (!container) return;

  // Show/hide results
  if (currentIndex >= currentQuiz.length) {
    showResults();
    return;
  }

  if (resultsEl) resultsEl.style.display = 'none';
  container.style.display = 'block';
  if (navEl) navEl.style.display = 'flex';

  const q = currentQuiz[currentIndex];
  answered = false;

  const diseaseLabel = {
    asma: 'ASMA',
    epoc: 'EPOC',
    tbc: 'TUBERCULOSIS',
    colecistitis: 'COLECISTITIS',
    diabetes: 'DIABETES',
    urgencias: 'URGENCIAS ENDOCRINAS'
  };

  container.innerHTML = `
    <div class="quiz-question-card" role="group" aria-labelledby="quiz-question-text">
      <div class="quiz-disease-tag tag-${q.disease}">${diseaseLabel[q.disease]}</div>

      <div class="quiz-scenario" role="note" aria-label="Caso clínico">
        <strong style="color: var(--text-secondary); font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.08em; display: block; margin-bottom: 0.5rem;">CASO CLÍNICO</strong>
        ${q.scenario}
      </div>

      <p class="quiz-question" id="quiz-question-text">${q.question}</p>

      <div class="quiz-options" role="radiogroup" aria-labelledby="quiz-question-text">
        ${q.options.map((opt, i) => `
          <button class="quiz-option"
            data-index="${i}"
            role="radio"
            aria-checked="false"
            aria-label="Opción ${String.fromCharCode(65 + i)}: ${opt}"
            onclick="selectAnswer(${i})">
            <span class="quiz-option-letter" aria-hidden="true">${String.fromCharCode(65 + i)}</span>
            <span>${opt}</span>
          </button>
        `).join('')}
      </div>

      <div class="quiz-explanation" id="quiz-explanation" aria-live="polite" aria-atomic="true">
        <div class="quiz-explanation-title">
          <span id="quiz-result-icon"></span>
          Explicación
        </div>
        <div class="quiz-explanation-text">${q.explanation}</div>
        <div class="quiz-explanation-ref">📚 ${q.reference}</div>
      </div>
    </div>
  `;

  // Update counter
  const counter = document.getElementById('quiz-counter');
  if (counter) {
    counter.textContent = `Pregunta ${currentIndex + 1} de ${currentQuiz.length}`;
  }

  // Next button state
  const nextBtn = document.getElementById('quiz-next-btn');
  if (nextBtn) {
    nextBtn.disabled = true;
    nextBtn.style.opacity = '0.5';
  }
}

// ============================================
// Select Answer
// ============================================
function selectAnswer(selectedIndex) {
  if (answered) return;
  answered = true;

  const q = currentQuiz[currentIndex];
  const options = document.querySelectorAll('.quiz-option');
  const explanation = document.getElementById('quiz-explanation');
  const resultIcon = document.getElementById('quiz-result-icon');

  const isCorrect = selectedIndex === q.correctIndex;

  if (isCorrect) {
    score++;
    diseaseScores[q.disease] = (diseaseScores[q.disease] || 0) + 1;
  }

  // Update score display
  const scoreEl = document.getElementById('quiz-score-display');
  if (scoreEl) {
    scoreEl.textContent = `${score} / ${currentIndex + 1}`;
  }

  // Style options
  options.forEach((opt, i) => {
    opt.disabled = true;
    opt.setAttribute('aria-checked', i === selectedIndex ? 'true' : 'false');

    if (i === selectedIndex && isCorrect) {
      opt.classList.add('correct');
      opt.querySelector('.quiz-option-letter').innerHTML = '✓';
    } else if (i === selectedIndex && !isCorrect) {
      opt.classList.add('incorrect');
      opt.querySelector('.quiz-option-letter').innerHTML = '✗';
    } else if (i === q.correctIndex) {
      opt.classList.add('correct');
      opt.querySelector('.quiz-option-letter').innerHTML = '✓';
    }
  });

  // Show explanation
  if (explanation) {
    explanation.classList.add('visible');
    if (isCorrect) {
      explanation.style.background = 'rgba(46, 204, 113, 0.06)';
      explanation.style.borderColor = 'rgba(46, 204, 113, 0.3)';
      if (resultIcon) resultIcon.textContent = '✅ Correcto — ';
    } else {
      explanation.style.background = 'rgba(255, 71, 87, 0.06)';
      explanation.style.borderColor = 'rgba(255, 71, 87, 0.3)';
      if (resultIcon) resultIcon.textContent = '❌ Incorrecto — ';
    }
  }

  // Enable next button
  const nextBtn = document.getElementById('quiz-next-btn');
  if (nextBtn) {
    nextBtn.disabled = false;
    nextBtn.style.opacity = '1';
  }

  updateProgress();
}

// ============================================
// Next Question
// ============================================
function nextQuestion() {
  currentIndex++;
  renderQuestion();
  updateProgress();

  // Scroll to top of quiz
  const container = document.getElementById('quiz-question-container');
  if (container) {
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// ============================================
// Update Progress
// ============================================
function updateProgress() {
  const fill = document.getElementById('quiz-progress-fill');
  if (fill) {
    const progress = currentQuiz.length > 0 ? (currentIndex / currentQuiz.length) * 100 : 0;
    fill.style.width = progress + '%';
  }
}

// ============================================
// Show Results
// ============================================
function showResults() {
  const container = document.getElementById('quiz-question-container');
  const resultsEl = document.getElementById('quiz-results');
  const navEl = document.getElementById('quiz-nav');

  if (container) container.style.display = 'none';
  if (navEl) navEl.style.display = 'none';

  if (!resultsEl) return;
  resultsEl.style.display = 'block';

  const percentage = Math.round((score / currentQuiz.length) * 100);
  let message, messageColor;

  if (percentage >= 90) {
    message = '¡Excelente! Dominio sobresaliente';
    messageColor = 'var(--green)';
  } else if (percentage >= 70) {
    message = 'Muy bien. Buen desempeño clínico';
    messageColor = 'var(--accent)';
  } else if (percentage >= 50) {
    message = 'Aprobado. Repasa los conceptos fallados';
    messageColor = '#F39C12';
  } else {
    message = 'Necesitas repasar el material';
    messageColor = 'var(--red)';
  }

  const diseaseNames = {
    asma: 'Asma',
    epoc: 'EPOC',
    tbc: 'Tuberculosis',
    colecistitis: 'Colecistitis',
    diabetes: 'Diabetes',
    urgencias: 'Urgencias Endocrinas'
  };

  resultsEl.innerHTML = `
    <div class="quiz-results" role="main" aria-label="Resultados del quiz">
      <div class="quiz-result-score" aria-label="Puntuación: ${score} de ${currentQuiz.length}">
        ${score}<span style="font-size: 2rem; color: var(--text-secondary);">/${currentQuiz.length}</span>
      </div>
      <p class="quiz-result-label" style="color: ${messageColor}">${message}</p>
      <p style="color: var(--text-secondary); margin-bottom: var(--space-xl); font-size: 0.875rem;">
        ${percentage}% de respuestas correctas
      </p>

      <div class="quiz-result-breakdown" role="list" aria-label="Resultados por enfermedad">
        ${Object.entries(diseaseNames).map(([key, name]) => {
          const total = diseaseTotal[key] || 0;
          if (total === 0) return '';
          const correct = diseaseScores[key] || 0;
          const pct = Math.round((correct / total) * 100);
          return `
            <div class="quiz-result-disease" role="listitem">
              <div class="quiz-result-disease-name">${name}</div>
              <div class="quiz-result-disease-score">${correct}/${total}</div>
              <div style="font-size: 0.7rem; color: var(--text-secondary); margin-top: 4px;">${pct}%</div>
              <div style="height: 4px; background: var(--bg-card); border-radius: 2px; margin-top: 8px; overflow: hidden;">
                <div style="height: 100%; width: ${pct}%; background: linear-gradient(90deg, var(--accent), var(--accent2)); border-radius: 2px; transition: width 1s ease;"></div>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
        <button class="btn btn-primary" onclick="loadQuiz('todos')" aria-label="Reiniciar quiz con todas las preguntas">
          Reintentar Quiz
        </button>
        <button class="btn btn-secondary" onclick="window.location.href='index.html'" aria-label="Volver a la página de inicio">
          Volver al Inicio
        </button>
      </div>
    </div>
  `;

  // Update progress bar to 100%
  const fill = document.getElementById('quiz-progress-fill');
  if (fill) fill.style.width = '100%';
}

// ============================================
// Init Quiz Page
// ============================================
function initQuizPage() {
  const quizSection = document.getElementById('quiz-section');
  if (!quizSection) return;

  // Set up filter buttons
  const filterBtns = document.querySelectorAll('.quiz-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      loadQuiz(this.dataset.filter);
    });
  });

  // Load default quiz
  loadQuiz('todos');
}

// Expose to global scope
window.selectAnswer = selectAnswer;
window.nextQuestion = nextQuestion;
window.loadQuiz = loadQuiz;

// Auto-init if quiz page
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initQuizPage);
} else {
  initQuizPage();
}
