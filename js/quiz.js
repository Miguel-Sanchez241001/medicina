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
  }
];

// ============================================
// Quiz State
// ============================================
let currentQuiz = [];
let currentIndex = 0;
let score = 0;
let answered = false;
let diseaseScores = { asma: 0, epoc: 0, tbc: 0, colecistitis: 0 };
let diseaseTotal = { asma: 0, epoc: 0, tbc: 0, colecistitis: 0 };

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
  diseaseScores = { asma: 0, epoc: 0, tbc: 0, colecistitis: 0 };
  diseaseTotal = { asma: 0, epoc: 0, tbc: 0, colecistitis: 0 };

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
    colecistitis: 'COLECISTITIS'
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
    colecistitis: 'Colecistitis'
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
