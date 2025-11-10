import SEO from '../components/SEO'

const Docs = () => {
  return (
    <>
      <SEO 
        title="Documentation | TrimToolsHub Setup Guide"
        description="Complete guide for setting up and deploying TrimToolsHub. Learn how to run locally, build for production, and deploy to cPanel."
        canonical="/docs"
      />
      
      <div className="container">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ marginBottom: '2rem', color: 'var(--text-primary)' }}>
            Documentation
          </h1>

          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-primary)', fontSize: '1.5rem' }}>
              WAMP Development Setup
            </h2>
            <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '0.75rem', marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                1. Install Node.js LTS on Windows
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Download and install Node.js LTS from <a href="https://nodejs.org" style={{ color: 'var(--accent)' }}>nodejs.org</a>. 
                Ensure <code style={{ backgroundColor: 'var(--bg-tertiary)', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>npm -v</code> works in your terminal.
              </p>
              
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                2. Install Dependencies
              </h3>
              <div style={{ backgroundColor: 'var(--bg-primary)', padding: '1rem', borderRadius: '0.5rem', fontFamily: 'monospace', color: 'var(--text-primary)' }}>
                npm install
              </div>
              
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                3. Start Development Server
              </h3>
              <div style={{ backgroundColor: 'var(--bg-primary)', padding: '1rem', borderRadius: '0.5rem', fontFamily: 'monospace', color: 'var(--text-primary)' }}>
                npm run dev
              </div>
              <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>
                Access the development URL shown in terminal (e.g., <code style={{ backgroundColor: 'var(--bg-tertiary)', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>http://localhost:5173</code>).
              </p>
            </div>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-primary)', fontSize: '1.5rem' }}>
              Production Build
            </h2>
            <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '0.75rem', marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                1. Configure Environment
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Copy <code style={{ backgroundColor: 'var(--bg-tertiary)', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>env.example</code> to <code style={{ backgroundColor: 'var(--bg-tertiary)', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>.env</code> and update with your values:
              </p>
              <div style={{ backgroundColor: 'var(--bg-primary)', padding: '1rem', borderRadius: '0.5rem', fontFamily: 'monospace', color: 'var(--text-primary)', fontSize: '0.875rem' }}>
                VITE_SITE_URL=https://yourdomain.com<br/>
                VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX<br/>
                VITE_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX<br/>
                VITE_ENABLE_ADS=true
              </div>
              
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                2. Build for Production
              </h3>
              <div style={{ backgroundColor: 'var(--bg-primary)', padding: '1rem', borderRadius: '0.5rem', fontFamily: 'monospace', color: 'var(--text-primary)' }}>
                npm run build
              </div>
              <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>
                This generates the <code style={{ backgroundColor: 'var(--bg-tertiary)', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>/dist</code> folder and automatically creates <code style={{ backgroundColor: 'var(--bg-tertiary)', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>sitemap.xml</code>.
              </p>
            </div>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-primary)', fontSize: '1.5rem' }}>
              cPanel Deployment
            </h2>
            <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '0.75rem', marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                1. Upload Files
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                In cPanel File Manager, upload all contents of the <code style={{ backgroundColor: 'var(--bg-tertiary)', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>/dist</code> folder into <code style={{ backgroundColor: 'var(--bg-tertiary)', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>public_html</code> (or subfolder).
              </p>
              
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                2. SSL Configuration
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Ensure SSL is enabled via cPanel AutoSSL or Cloudflare for security and SEO benefits.
              </p>
              
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                3. Subfolder Deployment
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                If deploying to a subfolder, update <code style={{ backgroundColor: 'var(--bg-tertiary)', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>VITE_SITE_URL</code> in your <code style={{ backgroundColor: 'var(--bg-tertiary)', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>.env</code> file accordingly.
              </p>
            </div>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-primary)', fontSize: '1.5rem' }}>
              Analytics & Advertising
            </h2>
            <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '0.75rem', marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                Google Analytics 4
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Set <code style={{ backgroundColor: 'var(--bg-tertiary)', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>VITE_GA_MEASUREMENT_ID</code> in your <code style={{ backgroundColor: 'var(--bg-tertiary)', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>.env</code> file before building.
              </p>
              
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                Google AdSense
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Set <code style={{ backgroundColor: 'var(--bg-tertiary)', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>VITE_ADSENSE_CLIENT</code> and <code style={{ backgroundColor: 'var(--bg-tertiary)', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>VITE_ENABLE_ADS=true</code> for production.
              </p>
              
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                Disable Ads for Development
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Set <code style={{ backgroundColor: 'var(--bg-tertiary)', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>VITE_ENABLE_ADS=false</code> to disable ads during development.
              </p>
            </div>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-primary)', fontSize: '1.5rem' }}>
              Available Commands
            </h2>
            <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '0.75rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <code style={{ backgroundColor: 'var(--bg-primary)', padding: '0.5rem', borderRadius: '0.25rem', display: 'block', fontFamily: 'monospace' }}>
                  npm install
                </code>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                  Install all project dependencies
                </p>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <code style={{ backgroundColor: 'var(--bg-primary)', padding: '0.5rem', borderRadius: '0.25rem', display: 'block', fontFamily: 'monospace' }}>
                  npm run dev
                </code>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                  Start development server with hot reload
                </p>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <code style={{ backgroundColor: 'var(--bg-primary)', padding: '0.5rem', borderRadius: '0.25rem', display: 'block', fontFamily: 'monospace' }}>
                  npm run build
                </code>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                  Build for production (includes sitemap generation)
                </p>
              </div>
              
              <div>
                <code style={{ backgroundColor: 'var(--bg-primary)', padding: '0.5rem', borderRadius: '0.25rem', display: 'block', fontFamily: 'monospace' }}>
                  npm run preview
                </code>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                  Preview production build locally
                </p>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '0.75rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Need Help?
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              For additional support or questions about TrimToolsHub setup and deployment.
            </p>
            <a 
              href="mailto:support@trimkore.com"
              style={{
                display: 'inline-block',
                padding: '0.75rem 1.5rem',
                backgroundColor: 'var(--accent)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '0.5rem',
                fontWeight: '500'
              }}
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Docs
