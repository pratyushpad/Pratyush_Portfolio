# Pratyush Padhy: Portfolio

Source for [pratyushp-portfolio.netlify.app](https://pratyushp-portfolio.netlify.app), the portfolio of
Pratyush Padhy, Software Development Engineer Intern at AWS and UC Irvine CS student (Intelligent
Systems, Class of 2028).

It has case studies for:

- **Chronicle**: job aggregator over nearly 600 Greenhouse, Lever and Ashby boards, with hybrid pgvector search
- **Forge**: GRPO post-training of Qwen2.5-1.5B, GSM8K pass@1 from 58.8% to 70.0%
- **Lumina**, **FacePulse** and **Argus AI**

Resume: [Pratyush_Padhy_Resume.pdf](https://pratyushp-portfolio.netlify.app/Pratyush_Padhy_Resume.pdf)

## Tech Stack

React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, React Router. Deployed on Netlify.

## Running Locally

```bash
cd frontend
npm install
npm run dev      # dev server
npm run build    # type-check + production build
npm run preview  # preview the production build
```

## Deployment

Hosted on **Netlify**:
- Base directory: `frontend`
- Build command: `npm run build`
- Publish directory: `dist`
