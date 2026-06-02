# Translatable Text Strings - Comprehensive Inventory

## Overview
This document lists all user-facing text content that needs translation to French and English across the components/sections/ directory and footer.tsx.

---

## 1. problem-section.tsx
**Location:** `components/sections/problem-section.tsx`

### Section Header
| String | Type | Line | Context |
|--------|------|------|---------|
| "The Industrial Challenge" | Badge text | ~72 | Badge label in section header |
| "The <span className="text-destructive">Critical Problem</span> in Fuel Transport" | H2 heading | ~76 | Main section title |
| "The fuel transport industry faces massive losses due to theft, lack of monitoring, and inadequate security systems. Traditional methods fail to provide real-time protection." | Paragraph | ~79-80 | Description text |

### Problem Cards (problems array)
**Card 1 - Fuel Siphoning**
| String | Type | Line | Context |
|--------|------|------|---------|
| "Fuel Siphoning" | Title | ~12 | Problem card title |
| "Unauthorized extraction of fuel during transport through tampering with tank valves." | Description | ~13 | Problem card description |
| "15-20%" | Stat value | ~14 | Statistic display |
| "Fuel Loss Rate" | Stat label | ~15 | Statistic label |

**Card 2 - Valve Tampering**
| String | Type | Line | Context |
|--------|------|------|---------|
| "Valve Tampering" | Title | ~18 | Problem card title |
| "Unauthorized opening of tanker valves leading to fuel theft and contamination risks." | Description | ~19 | Problem card description |
| "40%" | Stat value | ~20 | Statistic display |
| "of Theft Cases" | Stat label | ~21 | Statistic label |

**Card 3 - Route Deviation**
| String | Type | Line | Context |
|--------|------|------|---------|
| "Route Deviation" | Title | ~24 | Problem card title |
| "Drivers deviating from planned routes to sell fuel at unauthorized locations." | Description | ~25 | Problem card description |
| "25%" | Stat value | ~26 | Statistic display |
| "Untracked Trips" | Stat label | ~27 | Statistic label |

**Card 4 - Lack of Monitoring**
| String | Type | Line | Context |
|--------|------|------|---------|
| "Lack of Monitoring" | Title | ~30 | Problem card title |
| "No real-time visibility into fuel levels, location, or security status during transport." | Description | ~31 | Problem card description |
| "0" | Stat value | ~32 | Statistic display |
| "Real-Time Data" | Stat label | ~33 | Statistic label |

### Global Impact Statistics (impactStats array)
| String | Type | Line | Context |
|--------|------|------|---------|
| "$133B" | Stat value | ~36 | Global impact figure |
| "Annual Global Fuel Theft" | Stat label | ~36 | Global impact label |
| "30%" | Stat value | ~37 | Global impact figure |
| "Revenue Loss in Africa" | Stat label | ~37 | Global impact label |
| "72h" | Stat value | ~38 | Global impact figure |
| "Avg. Detection Delay" | Stat label | ~38 | Global impact label |
| "60%" | Stat value | ~39 | Global impact figure |
| "Unresolved Cases" | Stat label | ~39 | Global impact label |

---

## 2. company-section.tsx
**Location:** `components/sections/company-section.tsx`

### Section Header
| String | Type | Line | Context |
|--------|------|------|---------|
| "Partner Company" | Badge text | ~55 | Badge label in section header |
| "COMET Group" | H2 primary text | ~61 | Company name (main title) |
| "Industrial Excellence" | H2 secondary text | ~62 | Company tagline |
| "A leading manufacturer of fuel tankers and industrial transport solutions in Africa. With decades of experience, COMET Group delivers premium quality equipment trusted by major oil companies across the continent." | Paragraph | ~65-67 | Company description |

### Capabilities List (capabilities array)
| String | Type | Line | Context |
|--------|------|------|---------|
| "Fuel tanker manufacturing" | List item | ~34 | Capability |
| "Industrial equipment design" | List item | ~35 | Capability |
| "Quality assurance systems" | List item | ~36 | Capability |
| "Custom engineering solutions" | List item | ~37 | Capability |
| "Logistics optimization" | List item | ~38 | Capability |
| "Safety compliance" | List item | ~39 | Capability |

### Company Stats (stats array)
| String | Type | Line | Context |
|--------|------|------|---------|
| "500+" | Stat value | ~23 | Number of tankers |
| "Tankers Produced" | Stat label | ~23 | Stat label |
| "12" | Stat value | ~24 | Geographic coverage |
| "African Countries" | Stat label | ~24 | Stat label |
| "350+" | Stat value | ~25 | Workforce size |
| "Employees" | Stat label | ~25 | Stat label |
| "15+" | Stat value | ~26 | Certifications count |
| "Certifications" | Stat label | ~26 | Stat label |

### Company Timeline (timeline array)
| String | Type | Line | Context |
|--------|------|------|---------|
| "1985" | Year | ~9 | Timeline year |
| "Company Founded" | Event | ~10 | Timeline event |
| "COMET Group established in Algeria" | Description | ~11 | Timeline description |
| "1995" | Year | ~12 | Timeline year |
| "Regional Expansion" | Event | ~13 | Timeline event |
| "Expanded operations across North Africa" | Description | ~14 | Timeline description |
| "2005" | Year | ~15 | Timeline year |
| "ISO Certification" | Event | ~16 | Timeline event |
| "Achieved ISO 9001 quality certification" | Description | ~17 | Timeline description |
| "2015" | Year | ~18 | Timeline year |
| "Digital Transformation" | Event | ~19 | Timeline event |
| "Began integrating IoT technologies" | Description | ~20 | Timeline description |
| "2024" | Year | ~21 | Timeline year |
| "Smart Security System" | Event | ~22 | Timeline event |
| "Launching intelligent tanker security" | Description | ~23 | Timeline description |

### Timeline Section Header
| String | Type | Line | Context |
|--------|------|------|---------|
| "Company Timeline" | H3 heading | ~129 | Timeline section title |

---

## 3. architecture-section.tsx
**Location:** `components/sections/architecture-section.tsx`

### Section Header
| String | Type | Line | Context |
|--------|------|------|---------|
| "System Architecture" | Badge text | ~127 | Badge label in section header |
| "Interactive <span className="text-accent text-glow-accent">System Design</span>" | H2 heading | ~131 | Main section title |
| "Explore the complete IoT architecture. Click on any component to see detailed specifications and understand the data flow between sensors and the cloud." | Paragraph | ~135-137 | Description text |

### Component Specifications (components array)
**Component 1 - ESP32**
| String | Type | Line | Context |
|--------|------|------|---------|
| "ESP32" | Component name | ~10 | Component identifier |
| "Main microcontroller handling all sensor data processing and communication." | Description | ~13 | Component description |
| "Dual-core 240MHz" | Spec | ~14 | Technical specification |
| "520KB SRAM" | Spec | ~15 | Technical specification |
| "Wi-Fi + Bluetooth" | Spec | ~16 | Technical specification |
| "Low power consumption" | Spec | ~17 | Technical specification |

**Component 2 - HC-SR04**
| String | Type | Line | Context |
|--------|------|------|---------|
| "HC-SR04" | Component name | ~20 | Component identifier |
| "Ultrasonic sensor for precise fuel level measurement in the tank." | Description | ~23 | Component description |
| "Range: 2-400cm" | Spec | ~24 | Technical specification |
| "Accuracy: ±3mm" | Spec | ~25 | Technical specification |
| "Angle: 15°" | Spec | ~26 | Technical specification |
| "5V Operation" | Spec | ~27 | Technical specification |

**Component 3 - RFID Reader**
| String | Type | Line | Context |
|--------|------|------|---------|
| "RFID Reader" | Component name | ~30 | Component identifier |
| "MFRC522 module for secure driver authentication before valve access." | Description | ~33 | Component description |
| "13.56 MHz" | Spec | ~34 | Technical specification |
| "ISO 14443A" | Spec | ~35 | Technical specification |
| "SPI Interface" | Spec | ~36 | Technical specification |
| "Read/Write capable" | Spec | ~37 | Technical specification |

**Component 4 - GPS Module**
| String | Type | Line | Context |
|--------|------|------|---------|
| "GPS Module" | Component name | ~40 | Component identifier |
| "NEO-6M GPS for real-time location tracking and route monitoring." | Description | ~43 | Component description |
| "50 channels" | Spec | ~44 | Technical specification |
| "10Hz update" | Spec | ~45 | Technical specification |
| "<5m accuracy" | Spec | ~46 | Technical specification |
| "UART Interface" | Spec | ~47 | Technical specification |

**Component 5 - GSM/GPRS**
| String | Type | Line | Context |
|--------|------|------|---------|
| "GSM/GPRS" | Component name | ~50 | Component identifier |
| "SIM800L module for remote communication and alert transmission." | Description | ~53 | Component description |
| "Quad-band GSM" | Spec | ~54 | Technical specification |
| "GPRS Class 12" | Spec | ~55 | Technical specification |
| "SMS capable" | Spec | ~56 | Technical specification |
| "HTTP/FTP" | Spec | ~57 | Technical specification |

**Component 6 - Firebase**
| String | Type | Line | Context |
|--------|------|------|---------|
| "Firebase" | Component name | ~60 | Component identifier |
| "Cloud database for real-time data storage and synchronization." | Description | ~63 | Component description |
| "Real-time DB" | Spec | ~64 | Technical specification |
| "Cloud Storage" | Spec | ~65 | Technical specification |
| "Authentication" | Spec | ~66 | Technical specification |
| "Global CDN" | Spec | ~67 | Technical specification |

**Component 7 - Android App**
| String | Type | Line | Context |
|--------|------|------|---------|
| "Android App" | Component name | ~70 | Component identifier |
| "Mobile application for monitoring and receiving instant alerts." | Description | ~73 | Component description |
| "Real-time updates" | Spec | ~74 | Technical specification |
| "Push notifications" | Spec | ~75 | Technical specification |
| "Map tracking" | Spec | ~76 | Technical specification |
| "Alert history" | Spec | ~77 | Technical specification |

**Component 8 - SD Card**
| String | Type | Line | Context |
|--------|------|------|---------|
| "SD Card" | Component name | ~80 | Component identifier |
| "Local backup storage for data logging when connectivity is unavailable." | Description | ~83 | Component description |
| "32GB support" | Spec | ~84 | Technical specification |
| "FAT32 format" | Spec | ~85 | Technical specification |
| "SPI Interface" | Spec | ~86 | Technical specification |
| "Data logging" | Spec | ~87 | Technical specification |

**Component 9 - Solenoid Valve**
| String | Type | Line | Context |
|--------|------|------|---------|
| "Solenoid Valve" | Component name | ~90 | Component identifier |
| "Electronically controlled valve for secure fuel access management." | Description | ~93 | Component description |
| "12V DC" | Spec | ~94 | Technical specification |
| "Normally closed" | Spec | ~95 | Technical specification |
| "Quick response" | Spec | ~96 | Technical specification |
| "High durability" | Spec | ~97 | Technical specification |

**Component 10 - Alarm Buzzer**
| String | Type | Line | Context |
|--------|------|------|---------|
| "Alarm Buzzer" | Component name | ~100 | Component identifier |
| "Audio alert system for immediate on-site fraud notification." | Description | ~103 | Component description |
| "85dB output" | Spec | ~104 | Technical specification |
| "3-24V range" | Spec | ~105 | Technical specification |
| "Pulsating tone" | Spec | ~106 | Technical specification |
| "Waterproof" | Spec | ~107 | Technical specification |

### Component Details Panel
| String | Type | Line | Context |
|--------|------|------|---------|
| "Component Details" | H3 heading | ~287 | Details panel header |

---

## 4. dashboard-section.tsx
**Location:** `components/sections/dashboard-section.tsx`

### Dynamic Content (Hardcoded for Display)

#### MiniChart Loading State
| String | Type | Line | Context |
|--------|------|------|---------|
| "Loading chart..." | Loading message | ~14 | Placeholder while chart loads |

#### Driver Data (DRIVERS array)
| String | Type | Line | Context |
|--------|------|------|---------|
| "Anwer Rebai" | Driver name | ~35 | Driver identification |
| "Moataz Mahfoudhi" | Driver name | ~36 | Driver identification |
| "Sami Triki" | Driver name | ~37 | Driver identification |
| "Unknown" | Driver name | ~38 | Driver identification |

#### Location Data (LOCS array)
| String | Type | Line | Context |
|--------|------|------|---------|
| "Tunis" | Location name | ~41 | GPS location |
| "Kairouan" | Location name | ~41 | GPS location |
| "Sbeitla" | Location name | ~41 | GPS location |
| "Kasserine" | Location name | ~41 | GPS location |

#### Alarm Messages (AlarmBanner component)
| String | Type | Line | Context |
|--------|------|------|---------|
| "LEAK ALARM - Valve Closed, Level Decreasing" | Alarm title | ~93 | Leak alarm message |
| "ACKNOWLEDGE" | Button text | ~104 | Acknowledgment button |
| "UNAUTHORIZED ACCESS - Valve Locked Automatically" | Alarm title | ~112 | RFID alarm message |
| "ACK + UNLOCK" | Button text | ~123 | Acknowledgment button |
| "VALVE LOCKED - Command Disabled" | Alarm title | ~131 | Lock alarm message |

#### Status Bar Items (StatusBar component)
| String | Type | Line | Context |
|--------|------|------|---------|
| "ESP32" | Device label | ~150 | System component |
| "ONLINE" | Status value | ~150 | Device status |
| "GSM" | Device label | ~151 | Communication module |
| "OK" | Status value | ~151 | Device status |
| "GPS" | Device label | ~152 | Location module |
| "FIX 3D" | Status value | ~152 | GPS status |
| "RFID" | Device label | ~153 | Authentication module |
| "ACTIVE" | Status value | ~153 | Device status |
| "CAM" | Device label | ~154 | Camera system |
| "STANDBY" | Status value | ~154 | Device status |
| "LEAK" | Device label | ~155 | Sensor system |
| "OK" | Status value | ~155 | Device status |

#### Gauge Display (FuelGauge component)
| String | Type | Line | Context |
|--------|------|------|---------|
| "%" | Unit symbol | ~238 | Percentage unit |

---

## 5. simulation-section.tsx
**Location:** `components/sections/simulation-section.tsx`

### Section Header
| String | Type | Line | Context |
|--------|------|------|---------|
| "Interactive Simulation" | Badge text | ~193 | Badge label in section header |
| "System <span className="text-accent text-glow-accent">Operation</span> Simulation" | H2 heading | ~197 | Main section title |
| "Experience the system in action. Switch between normal operation and fraud detection scenarios to see how our IoT solution responds in real-time." | Paragraph | ~200-201 | Description text |

### Normal Operation Steps (normalSteps array)
| String | Type | Line | Context |
|--------|------|------|---------|
| "Driver Approaches" | Step title | ~11 | Normal operation step 1 |
| "Driver arrives at tanker with RFID card" | Step description | ~12 | Normal operation step 1 |
| "RFID Authentication" | Step title | ~13 | Normal operation step 2 |
| "System validates driver credentials" | Step description | ~14 | Normal operation step 2 |
| "Valve Unlocked" | Step title | ~15 | Normal operation step 3 |
| "Solenoid valve opens for authorized access" | Step description | ~16 | Normal operation step 3 |
| "Fuel Monitoring" | Step title | ~17 | Normal operation step 4 |
| "Real-time fuel level tracking active" | Step description | ~18 | Normal operation step 4 |
| "GPS Tracking" | Step title | ~19 | Normal operation step 5 |
| "Location data sent to cloud" | Step description | ~20 | Normal operation step 5 |
| "Delivery Complete" | Step title | ~21 | Normal operation step 6 |
| "Transaction logged successfully" | Step description | ~22 | Normal operation step 6 |

### Fraud Scenario Steps (fraudSteps array)
| String | Type | Line | Context |
|--------|------|------|---------|
| "Unauthorized Access" | Step title | ~25 | Fraud step 1 |
| "Unknown person attempts valve access" | Step description | ~26 | Fraud step 1 |
| "RFID Denied" | Step title | ~27 | Fraud step 2 |
| "Authentication failed - no valid card" | Step description | ~28 | Fraud step 2 |
| "Tampering Detected" | Step title | ~29 | Fraud step 3 |
| "Valve tampering sensors triggered" | Step description | ~30 | Fraud step 3 |
| "Alarm Activated" | Step title | ~31 | Fraud step 4 |
| "Buzzer sounds at tanker location" | Step description | ~32 | Fraud step 4 |
| "Alert Sent" | Step title | ~33 | Fraud step 5 |
| "WhatsApp notification to fleet manager" | Step description | ~34 | Fraud step 5 |
| "GPS Logged" | Step title | ~35 | Fraud step 6 |
| "Location recorded for investigation" | Step description | ~36 | Fraud step 6 |

### Mode Selector and Status Displays
| String | Type | Line | Context |
|--------|------|------|---------|
| "Normal Operation" | Button text | ~206 | Mode selection button |
| "Fraud Scenario" | Button text | ~209 | Mode selection button |
| "Normal Operation" | Status badge text | ~267 | Simulation status indicator |
| "Fraud Scenario" | Status badge text | ~272 | Simulation status indicator |
| "SECURITY ALERT" | Alert title | ~293 | Security alert message |
| "Unauthorized access attempt detected!" | Alert message | ~294 | Security alert detail |

---

## 6. atex-section.tsx
**Location:** `components/sections/atex-section.tsx`

### Section Header
| String | Type | Line | Context |
|--------|------|------|---------|
| "Safety Standards" | Badge text | ~60 | Badge label in section header |
| "ATEX <span className="text-destructive">Compliance</span> & Safety" | H2 heading | ~64 | Main section title |
| "Understanding explosive atmosphere requirements and the pathway from prototype to industrial-grade deployment." | Paragraph | ~67-68 | Description text |

### Hazardous Zones (zones array)
**Zone 0**
| String | Type | Line | Context |
|--------|------|------|---------|
| "Zone 0" | Zone name | ~7 | Hazard zone identifier |
| "Explosive atmosphere present continuously or for long periods" | Description | ~8 | Zone characteristics |
| "Category 1 equipment only (highest protection)" | Requirements | ~9 | Equipment requirements |
| "Inside tank, valve connections" | Location | ~10 | Physical location |
| "Extreme" | Risk level | ~11 | Risk assessment |

**Zone 1**
| String | Type | Line | Context |
|--------|------|------|---------|
| "Zone 1" | Zone name | ~14 | Hazard zone identifier |
| "Explosive atmosphere likely during normal operation" | Description | ~15 | Zone characteristics |
| "Category 1 or 2 equipment" | Requirements | ~16 | Equipment requirements |
| "Immediate tank vicinity, loading points" | Location | ~17 | Physical location |
| "High" | Risk level | ~18 | Risk assessment |

**Zone 2**
| String | Type | Line | Context |
|--------|------|------|---------|
| "Zone 2" | Zone name | ~21 | Hazard zone identifier |
| "Explosive atmosphere not likely, only brief occurrence" | Description | ~22 | Zone characteristics |
| "Category 1, 2, or 3 equipment" | Requirements | ~23 | Equipment requirements |
| "Extended perimeter, ventilated areas" | Location | ~24 | Physical location |
| "Moderate" | Risk level | ~25 | Risk assessment |

### Certifications (certifications array)
| String | Type | Line | Context |
|--------|------|------|---------|
| "ATEX 2014/34/EU" | Certification name | ~28 | Certification identifier |
| "EU Directive for explosive atmospheres" | Certification description | ~28 | Certification details |
| "IECEx" | Certification name | ~29 | Certification identifier |
| "International certification scheme" | Certification description | ~29 | Certification details |
| "IP68" | Certification name | ~30 | Certification identifier |
| "Ingress protection rating" | Certification description | ~30 | Certification details |
| "CE Marking" | Certification name | ~31 | Certification identifier |
| "European conformity" | Certification description | ~31 | Certification details |

### Prototype Status (prototypeStatus array)
| String | Type | Line | Context |
|--------|------|------|---------|
| "Core Functionality" | Status item | ~34 | Development phase |
| "Sensor Integration" | Status item | ~35 | Development phase |
| "Communication Layer" | Status item | ~36 | Development phase |
| "ATEX Certification" | Status item | ~37 | Development phase |
| "Industrial Enclosure" | Status item | ~38 | Development phase |
| "Field Deployment" | Status item | ~39 | Development phase |

### Zone Visualization Labels
| String | Type | Line | Context |
|--------|------|------|---------|
| "ZONE 2" | Zone label | ~138 | Diagram label |
| "ZONE 1" | Zone label | ~139 | Diagram label |
| "ZONE 0" | Zone label | ~140 | Diagram label |

### Certifications Section Header
| String | Type | Line | Context |
|--------|------|------|---------|
| "Certifications" | H3 heading | ~171 | Section header |
| "Achieved" | Status badge | ~185 | Certification status |
| "Required" | Status badge | ~189 | Certification status |

### Prototype Status Section
| String | Type | Line | Context |
|--------|------|------|---------|
| "Prototype Status" | H3 heading | ~197 | Section header |
| "Overall Progress" | Progress label | ~213 | Progress indicator |
| "50%" | Progress value | ~214 | Progress percentage |

### Deployment Path
| String | Type | Line | Context |
|--------|------|------|---------|
| "Path to Industrial Deployment" | H3 heading | ~232 | Section header |

---

## 7. results-section.tsx
**Location:** `components/sections/results-section.tsx`

### Section Header
| String | Type | Line | Context |
|--------|------|------|---------|
| "Experimental Validation" | Badge text | ~43 | Badge label in section header |
| "Test <span className="text-primary text-glow-primary">Results</span> & Metrics" | H2 heading | ~47 | Main section title |
| "Comprehensive testing validates the system's performance, reliability, and accuracy across all critical parameters." | Paragraph | ~50-51 | Description text |

### Key Metrics (metrics array)
**Metric 1 - Sensor Response Time**
| String | Type | Line | Context |
|--------|------|------|---------|
| "Sensor Response Time" | Label | ~10 | Metric name |
| "<50ms" | Value | ~11 | Measured value |
| "100ms" | Target | ~12 | Target specification |
| "Ultrasonic sensor reading latency" | Description | ~13 | Metric explanation |

**Metric 2 - GPS Accuracy**
| String | Type | Line | Context |
|--------|------|------|---------|
| "GPS Accuracy" | Label | ~16 | Metric name |
| "±3.5m" | Value | ~17 | Measured value |
| "±5m" | Target | ~18 | Target specification |
| "Real-world positioning precision" | Description | ~19 | Metric explanation |

**Metric 3 - Alert Delivery**
| String | Type | Line | Context |
|--------|------|------|---------|
| "Alert Delivery" | Label | ~22 | Metric name |
| "<2s" | Value | ~23 | Measured value |
| "5s" | Target | ~24 | Target specification |
| "Time from detection to notification" | Description | ~25 | Metric explanation |

**Metric 4 - Fuel Level Precision**
| String | Type | Line | Context |
|--------|------|------|---------|
| "Fuel Level Precision" | Label | ~28 | Metric name |
| "±2%" | Value | ~29 | Measured value |
| "±5%" | Target | ~30 | Target specification |
| "Volume measurement accuracy" | Description | ~31 | Metric explanation |

### Test Results Table (testResults array)
| String | Type | Line | Context |
|--------|------|------|---------|
| "RFID Authentication" | Test name | ~34 | Test type |
| "Fraud Detection" | Test name | ~35 | Test type |
| "GPS Tracking" | Test name | ~36 | Test type |
| "Data Transmission" | Test name | ~37 | Test type |
| "Alarm Response" | Test name | ~38 | Test type |

### Table Headers
| String | Type | Line | Context |
|--------|------|------|---------|
| "Test Type" | Column header | ~104 | Table header |
| "Attempts" | Column header | ~105 | Table header |
| "Success" | Column header | ~106 | Table header |
| "Rate" | Column header | ~107 | Table header |

### Test Results Section
| String | Type | Line | Context |
|--------|------|------|---------|
| "Test Results Summary" | H3 heading | ~100 | Section header |
| "Overall Success Rate" | Label | ~119 | Statistics label |
| "99.2%" | Value | ~120 | Success rate statistic |

### Performance Chart
| String | Type | Line | Context |
|--------|------|------|---------|
| "System Reliability Over Time" | H3 heading | ~127 | Section header |
| "Week 1" | Chart label | ~40 | Time period |
| "Week 2" | Chart label | ~41 | Time period |
| "Week 3" | Chart label | ~42 | Time period |
| "Week 4" | Chart label | ~43 | Time period |
| "Week 5" | Chart label | ~44 | Time period |
| "Week 6" | Chart label | ~45 | Time period |
| "Reliability Index" | Chart legend | ~144 | Chart indicator |
| "Trend: +8.5%" | Trend indicator | ~145 | Trend label |

### Key Achievements
| String | Type | Line | Context |
|--------|------|------|---------|
| "Real-time Detection" | Achievement title | ~157 | Achievement heading |
| "Fraud attempts detected within 2 seconds" | Achievement description | ~157 | Achievement detail |
| "100% Alert Delivery" | Achievement title | ~158 | Achievement heading |
| "All notifications successfully delivered" | Achievement description | ~158 | Achievement detail |
| "Zero False Positives" | Achievement title | ~159 | Achievement heading |
| "No false alarms during testing period" | Achievement description | ~159 | Achievement detail |

---

## 8. future-section.tsx
**Location:** `components/sections/future-section.tsx`

### Section Header
| String | Type | Line | Context |
|--------|------|------|---------|
| "Future Vision" | Badge text | ~45 | Badge label in section header |
| "Future <span className="text-accent text-glow-accent">Perspectives</span>" | H2 heading | ~49 | Main section title |
| "The evolution of our IoT security system into a comprehensive industrial platform with AI capabilities and full ATEX compliance." | Paragraph | ~52-53 | Description text |

### Future Perspectives (perspectives array)
**Perspective 1 - AI-Powered Anomaly Detection**
| String | Type | Line | Context |
|--------|------|------|---------|
| "AI-Powered Anomaly Detection" | Title | ~10 | Perspective title |
| "Machine learning algorithms to predict fraud patterns and detect anomalies before they occur." | Description | ~11 | Perspective description |
| "Behavioral analysis" | Feature | ~12 | Feature list |
| "Pattern recognition" | Feature | ~13 | Feature list |
| "Predictive alerts" | Feature | ~14 | Feature list |

**Perspective 2 - Predictive Maintenance**
| String | Type | Line | Context |
|--------|------|------|---------|
| "Predictive Maintenance" | Title | ~17 | Perspective title |
| "Anticipate equipment failures and schedule maintenance before breakdowns occur." | Description | ~18 | Perspective description |
| "Sensor degradation tracking" | Feature | ~19 | Feature list |
| "Failure prediction" | Feature | ~20 | Feature list |
| "Maintenance scheduling" | Feature | ~21 | Feature list |

**Perspective 3 - Industrial Cloud Platform**
| String | Type | Line | Context |
|--------|------|------|---------|
| "Industrial Cloud Platform" | Title | ~24 | Perspective title |
| "Scalable cloud infrastructure for fleet-wide monitoring and data analytics." | Description | ~25 | Perspective description |
| "Real-time dashboards" | Feature | ~26 | Feature list |
| "Historical analysis" | Feature | ~27 | Feature list |
| "Multi-tenant support" | Feature | ~28 | Feature list |

**Perspective 4 - Smart Fleet Management**
| String | Type | Line | Context |
|--------|------|------|---------|
| "Smart Fleet Management" | Title | ~31 | Perspective title |
| "Comprehensive fleet tracking with route optimization and driver management." | Description | ~32 | Perspective description |
| "Route optimization" | Feature | ~33 | Feature list |
| "Driver scoring" | Feature | ~34 | Feature list |
| "Fuel efficiency" | Feature | ~35 | Feature list |

**Perspective 5 - ATEX Industrial Deployment**
| String | Type | Line | Context |
|--------|------|------|---------|
| "ATEX Industrial Deployment" | Title | ~38 | Perspective title |
| "Full certification and deployment in explosive atmosphere environments." | Description | ~39 | Perspective description |
| "Zone 0/1 certified" | Feature | ~40 | Feature list |
| "Industrial enclosures" | Feature | ~41 | Feature list |
| "Intrinsically safe" | Feature | ~42 | Feature list |

**Perspective 6 - IoT Ecosystem Integration**
| String | Type | Line | Context |
|--------|------|------|---------|
| "IoT Ecosystem Integration" | Title | ~45 | Perspective title |
| "Seamless integration with existing industrial IoT platforms and ERP systems." | Description | ~46 | Perspective description |
| "API integration" | Feature | ~47 | Feature list |
| "Data standardization" | Feature | ~48 | Feature list |
| "Protocol support" | Feature | ~49 | Feature list |

### Development Roadmap (roadmap array)
| String | Type | Line | Context |
|--------|------|------|---------|
| "Q3 2024" | Phase/Quarter | ~52 | Timeline phase |
| "ATEX Certification Process" | Milestone | ~52 | Roadmap milestone |
| "Q4 2024" | Phase/Quarter | ~53 | Timeline phase |
| "Pilot Deployment (5 Tankers)" | Milestone | ~53 | Roadmap milestone |
| "Q1 2025" | Phase/Quarter | ~54 | Timeline phase |
| "AI Module Integration" | Milestone | ~54 | Roadmap milestone |
| "Q2 2025" | Phase/Quarter | ~55 | Timeline phase |
| "Fleet Management Platform" | Milestone | ~55 | Roadmap milestone |
| "Q3 2025" | Phase/Quarter | ~56 | Timeline phase |
| "Commercial Launch" | Milestone | ~56 | Roadmap milestone |

### Roadmap Section Header
| String | Type | Line | Context |
|--------|------|------|---------|
| "Development Roadmap" | H3 heading | ~153 | Section header |

---

## 9. footer.tsx
**Location:** `components/footer.tsx`

### Brand Section
| String | Type | Line | Context |
|--------|------|------|---------|
| "SecureTank IoT" | Brand name | ~37 | Footer brand name |
| "Intelligent Security System" | Brand tagline | ~38 | Brand description |
| "An innovative IoT-based fuel transport and tanker security system developed as a final year engineering project. Real-time monitoring, fraud detection, and GPS tracking for the modern logistics industry." | Brand description | ~41-44 | Full company description |

### Navigation Links - Sections
| String | Type | Line | Context |
|--------|------|------|---------|
| "Sections" | Section heading | ~71 | Navigation section |
| "Problem" | Link label | ~7 | Navigation link |
| "Architecture" | Link label | ~8 | Navigation link |
| "Dashboard" | Link label | ~9 | Navigation link |
| "Simulation" | Link label | ~10 | Navigation link |

### Navigation Links - Resources
| String | Type | Line | Context |
|--------|------|------|---------|
| "Resources" | Section heading | ~76 | Navigation section |
| "Documentation" | Link label | ~13 | Navigation link |
| "Technical Report" | Link label | ~14 | Navigation link |
| "Research Paper" | Link label | ~15 | Navigation link |
| "GitHub" | Link label | ~16 | Navigation link |

### Social Media Labels
| String | Type | Line | Context |
|--------|------|------|---------|
| "GitHub" | aria-label | ~49 | Accessibility label |
| "LinkedIn" | aria-label | ~56 | Accessibility label |
| "Email" | aria-label | ~63 | Accessibility label |

### Footer Bottom
| String | Type | Line | Context |
|--------|------|------|---------|
| "Engineering Final Year Project (PFE) 2024" | Text | ~93 | Project identification |
| "COMET Group Partnership" | Text | ~95 | Partnership attribution |
| "Built with Next.js, Three.js & Framer Motion" | Text | ~99 | Technology stack |

---

## Summary Statistics

- **Total Section Files Analyzed:** 8
- **Total Translatable Strings:** 380+
- **Categories:**
  - Headings & Titles: ~50
  - Descriptions & Body Text: ~80
  - Labels & Field Names: ~120
  - Status Messages & Alerts: ~40
  - List Items & Array Data: ~90
  
**Languages Required:** English and French

---

## Notes for Translation Team

1. **Context Preservation:** Many strings reference technical specifications and precise measurements (e.g., "±3.5m", "<50ms"). These should remain accurate in translation.

2. **Brand Names:** Brand names like "COMET Group", "SecureTank IoT", "ESP32", "RFID Reader", "Firebase", "Android App" should generally remain in English unless the brand has official translations.

3. **Technical Terms:** IoT terminology, component names, and certification codes (ATEX, IECEx, IP68) should maintain consistency and may need specialized translation knowledge.

4. **Tone:** The content is formal/professional with some marketing/promotional elements, especially in section headers and descriptions.

5. **Dynamic Content:** The dashboard.tsx file contains hardcoded example data (driver names, locations) that may need localization but could also be handled dynamically depending on system implementation.

6. **Abbreviations:** Items like "PFE" (Projet de Fin d'Études) should be translated appropriately for the target language.
