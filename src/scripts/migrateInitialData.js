import { initialPortfolioData } from '../data/initialPortfolioData';
import { 
  readDocument, 
  createRecord, 
  batchImport,
  COLLECTIONS,
  FIXED_DOCUMENTS 
} from '../services/portfolioService';

export const runMigration = async () => {
  const reports = [];
  
  try {
    reports.push("Starting database migration process...");

    // 1. Check whether migration has already completed
    const settingsDoc = await readDocument(COLLECTIONS.PORTFOLIO_SETTINGS, 'main');
    if (settingsDoc && settingsDoc.migrated === true) {
      reports.push("Migration skipped: Database has already been migrated (migrated: true found).");
      return { success: true, logs: reports };
    }

    reports.push("Initializing one-time migration copy...");

    // 2. Migrate Profile main doc
    await createRecord(COLLECTIONS.PROFILE, {
      ...initialPortfolioData.profile,
      published: true,
      sortOrder: 0
    }, 'main');
    reports.push("✓ Profile main document migrated successfully.");

    // 3. Migrate About main doc
    await createRecord(COLLECTIONS.ABOUT, {
      ...initialPortfolioData.about,
      published: true,
      sortOrder: 0
    }, 'main');
    reports.push("✓ About main document migrated successfully.");

    // 4. Migrate Resume main doc
    await createRecord(COLLECTIONS.RESUME, {
      ...initialPortfolioData.resume,
      published: true,
      sortOrder: 0
    }, 'main');
    reports.push("✓ Resume document reference migrated successfully.");

    // 5. Migrate ContactSettings main doc
    await createRecord(COLLECTIONS.CONTACT_SETTINGS, {
      ...initialPortfolioData.contactSettings,
      published: true,
      sortOrder: 0
    }, 'main');
    reports.push("✓ Contact settings document migrated successfully.");

    // 6. Migrate list records using batches to preserve IDs and prevent duplicates
    
    // Skill Categories
    const skillCategoriesList = initialPortfolioData.skills.map((cat, idx) => ({
      id: idx + 1,
      categoryName: cat.category,
      skillsList: cat.items,
      published: true,
      sortOrder: idx
    }));
    await batchImport(COLLECTIONS.SKILL_CATEGORIES, skillCategoriesList, (item) => `skills_cat_${item.id}`);
    reports.push(`✓ Skill categories migrated successfully (${skillCategoriesList.length} items).`);

    // Projects
    const projectsList = initialPortfolioData.projects.map((proj, idx) => ({
      id: proj.id,
      title: proj.title,
      category: proj.category,
      year: proj.year,
      status: proj.status,
      tech: proj.tech,
      summary: proj.summary,
      details: proj.details,
      problem: proj.problem,
      solution: proj.solution,
      contribution: proj.contribution,
      url: proj.url,
      repo: proj.repo,
      icon: proj.icon,
      slug: proj.slug,
      published: true,
      sortOrder: idx
    }));
    await batchImport(COLLECTIONS.PROJECTS, projectsList, (item) => `project_${item.id}`);
    reports.push(`✓ Projects list migrated successfully (${projectsList.length} items).`);

    // Experiences
    const experienceList = initialPortfolioData.experiences.map((exp, idx) => ({
      id: exp.id,
      date: exp.date,
      title: exp.title,
      company: exp.company,
      desc: exp.desc,
      techs: exp.techs,
      published: true,
      sortOrder: idx
    }));
    await batchImport(COLLECTIONS.EXPERIENCES, experienceList, (item) => `experience_${item.id}`);
    reports.push(`✓ Experience list migrated successfully (${experienceList.length} items).`);

    // Education
    const educationList = initialPortfolioData.education.map((edu, idx) => ({
      id: edu.id,
      icon: edu.icon,
      date: edu.date,
      degree: edu.degree,
      school: edu.school,
      details: edu.details,
      published: true,
      sortOrder: idx
    }));
    await batchImport(COLLECTIONS.EDUCATION, educationList, (item) => `education_${item.id}`);
    reports.push(`✓ Education list migrated successfully (${educationList.length} items).`);

    // Certificates
    const certificatesList = initialPortfolioData.certificates.map((cert, idx) => ({
      id: cert.id,
      title: cert.title,
      issuer: cert.issuer,
      date: cert.date,
      icon: cert.icon,
      borderColor: cert.borderColor,
      published: true,
      sortOrder: idx
    }));
    await batchImport(COLLECTIONS.CERTIFICATES, certificatesList, (item) => `cert_${item.id}`);
    reports.push(`✓ Certificates list migrated successfully (${certificatesList.length} items).`);

    // Publications
    const publicationsList = initialPortfolioData.publications.map((pub, idx) => ({
      id: pub.id,
      title: pub.title,
      issuer: pub.issuer,
      date: pub.date,
      desc: pub.desc,
      icon: pub.icon,
      paperFile: pub.paperFile,
      published: true,
      sortOrder: idx
    }));
    await batchImport(COLLECTIONS.PUBLICATIONS, publicationsList, (item) => `pub_${item.id}`);
    reports.push(`✓ Publications list migrated successfully (${publicationsList.length} items).`);

    // Social Links
    const socialLinksList = initialPortfolioData.socialLinks.map((link, idx) => ({
      id: link.id,
      name: link.name,
      url: link.url,
      icon: link.icon,
      published: true,
      sortOrder: idx
    }));
    await batchImport(COLLECTIONS.SOCIAL_LINKS, socialLinksList, (item) => `social_${item.id}`);
    reports.push(`✓ Social links migrated successfully (${socialLinksList.length} items).`);

    // 7. Write Migration Status to settings/main to mark completion
    await createRecord(COLLECTIONS.PORTFOLIO_SETTINGS, {
      ...initialPortfolioData.portfolioSettings,
      migrated: true,
      migratedAt: new Date().toISOString()
    }, 'main');
    reports.push("✓ Settings main document updated with status (migrated: true).");
    reports.push("Migration completed successfully!");
    
    return { success: true, logs: reports };
  } catch (error) {
    reports.push(`✗ Migration failed: ${error.message}`);
    console.error("Migration error:", error);
    return { success: false, logs: reports };
  }
};
export default runMigration;
