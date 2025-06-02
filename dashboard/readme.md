# LIMS Senior Chemist Dashboard Prototype

React-based functional prototype for the LIMS6000 Senior Chemist Dashboard.

## Quick Start

```bash
cd dashboard
npm install
npm start
```

## Important System Limitations

### Air Gap Between LIMS and Instruments
The LIMS system has a critical limitation due to the "air gap" between the LIMS and analytical instruments. This means:

- **No Real-time Instrument Feedback**: The LIMS cannot automatically know when instrument analysis is complete
- **Manual Data Export Required**: Scientists must manually export data from instruments and import into LIMS
- **"Awaiting Instrument Results" Status**: This phase represents samples that are on instruments but we cannot track completion status automatically
- **Human Intervention Needed**: Lab personnel must actively check instrument status and manually update LIMS when analysis is complete

This air gap exists for security and regulatory compliance reasons but creates workflow challenges that require careful process design.