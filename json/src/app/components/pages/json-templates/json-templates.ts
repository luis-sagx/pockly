import { Component, signal } from '@angular/core';
import { IconComponent } from '../../ui/icon/icon';

interface JsonTemplate {
  name: string;
  description: string;
  icon: string;
  content: string;
  category: 'simple' | 'common' | 'complex';
}

const TEMPLATES: JsonTemplate[] = [
  { name: 'User', description: 'Basic user - id, name, email, password', icon: 'fa-user', category: 'simple', content: `{"id": 1, "name": "John Doe", "email": "john@example.com", "password": "hashed_password_here", "status": "active"}` },
  { name: 'Post', description: 'Blog post - id, title, body, author', icon: 'fa-file-alt', category: 'simple', content: `{"id": 1, "title": "My First Post", "body": "Post content here...", "authorId": 1, "published": true, "views": 42}` },
  { name: 'Comment', description: 'Comment - id, postId, userId, text', icon: 'fa-comment', category: 'simple', content: `{"id": 1, "postId": 1, "userId": 2, "text": "Great post!", "createdAt": "2024-01-20T10:30:00Z"}` },
  { name: 'Category', description: 'Category - id, name, slug, parentId', icon: 'fa-folder', category: 'simple', content: `{"id": 1, "name": "Technology", "slug": "technology", "parentId": null}` },
  { name: 'Tag', description: 'Tag - id, name, slug', icon: 'fa-tag', category: 'simple', content: `{"id": 1, "name": "JavaScript", "slug": "javascript"}` },
  { name: 'Order', description: 'E-commerce order - id, userId, total, status', icon: 'fa-shopping-cart', category: 'simple', content: `{"id": 1, "userId": 1, "total": 99.99, "status": "pending", "items": [{"productId": 1, "quantity": 2, "price": 29.99}]}` },
  { name: 'Product', description: 'Product - id, name, price, category', icon: 'fa-box', category: 'simple', content: `{"id": 1, "name": "Wireless Mouse", "price": 29.99, "categoryId": 1, "inStock": true, "stock": 50}` },
  { name: 'Image', description: 'Image - id, url, alt, type', icon: 'fa-image', category: 'simple', content: `{"id": 1, "url": "https://example.com/img.jpg", "alt": "Description", "type": "jpg", "size": 102400}` },
  { name: 'File', description: 'File - id, name, url, size', icon: 'fa-file', category: 'simple', content: `{"id": 1, "name": "document.pdf", "url": "https://example.com/doc.pdf", "mimeType": "application/pdf", "size": 256000}` },
  { name: 'Setting', description: 'App setting - key, value', icon: 'fa-cog', category: 'simple', content: `{"key": "theme", "value": "dark", "type": "string"}` },
  { name: 'Session', description: 'User session - id, userId, token', icon: 'fa-clock', category: 'simple', content: `{"id": "sess_abc123", "userId": 1, "token": "jwt_token_here", "expiresAt": "2024-01-27T10:30:00Z"}` },
  { name: 'Login', description: 'Login data - email, password', icon: 'fa-sign-in-alt', category: 'simple', content: `{"email": "user@example.com", "password": "plain_password"}` },
  { name: 'Register', description: 'Registration - name, email, password', icon: 'fa-user-plus', category: 'simple', content: `{"name": "John Doe", "email": "john@example.com", "password": "hashed_password", "confirmPassword": "hashed_password"}` },
  { name: 'Profile', description: 'User profile - bio, avatar, social', icon: 'fa-id-card', category: 'simple', content: `{"userId": 1, "bio": "Hello world", "avatar": "https://example.com/avatar.jpg", "website": "https://johndoe.com", "location": "NYC"}` },
  { name: 'Address', description: 'Shipping/billing address', icon: 'fa-map-marker', category: 'simple', content: `{"userId": 1, "type": "shipping", "street": "123 Main St", "city": "New York", "state": "NY", "zip": "10001", "country": "US", "phone": "+1-555-123-4567"}` },
  { name: 'Full User', description: 'User with profile and relationships', icon: 'fa-user-circle', category: 'common', content: `{"id": 1, "username": "johndoe", "email": "john@example.com", "role": "user", "status": "active", "profile": {"firstName": "John", "lastName": "Doe", "bio": "Software developer"}, "createdAt": "2024-01-15T10:30:00Z"}` },
  { name: 'Full Product', description: 'Product with variants and images', icon: 'fa-boxes', category: 'common', content: `{"id": 1, "name": "Wireless Headphones", "slug": "wireless-headphones", "price": 299.99, "tags": ["audio", "wireless"], "images": [{"url": "https://example.com/1.jpg"}], "rating": 4.5, "inStock": true}` },
  { name: 'Full Order', description: 'Order with items and status', icon: 'fa-shopping-cart', category: 'common', content: `{"id": 1, "userId": 1, "status": "processing", "total": 112.99, "currency": "USD", "items": [{"productId": 1, "name": "Mouse", "qty": 2, "price": 29.99}], "createdAt": "2024-01-20T10:30:00Z"}` },
  { name: 'Blog Post', description: 'Post with content and relations', icon: 'fa-newspaper', category: 'common', content: `{"id": 1, "title": "Getting Started with Node.js", "slug": "getting-started-nodejs", "status": "published", "views": 1250, "createdAt": "2024-01-15T10:30:00Z"}` },
  { name: 'API Error', description: 'API error response', icon: 'fa-exclamation-triangle', category: 'common', content: `{"success": false, "error": {"code": "VALIDATION_ERROR", "message": "Invalid email format", "field": "email"}}` },
  { name: 'API Success', description: 'API success response', icon: 'fa-check-circle', category: 'common', content: `{"success": true, "message": "Operation completed", "data": {"id": 1, "name": "Item"}}` },
  { name: 'Pagination', description: 'Paginated response', icon: 'fa-list-ol', category: 'common', content: `{"data": [], "pagination": {"page": 1, "limit": 20, "total": 100, "totalPages": 5, "hasNext": true, "hasPrev": false}}` },
  { name: 'Form Input', description: 'Form input with validation', icon: 'fa-wpforms', category: 'common', content: `{"name": "", "email": "", "subject": "", "message": "", "attachments": []}` },
  { name: 'Filter', description: 'Filter options', icon: 'fa-filter', category: 'common', content: `{"search": "", "status": [], "page": 1, "limit": 20, "sortBy": "createdAt", "sortOrder": "desc"}` },
  { name: 'API Response', description: 'Full API response wrapper', icon: 'fa-server', category: 'complex', content: `{"success": true, "data": {"items": [], "total": 100}, "meta": {"requestId": "req_abc123", "timestamp": "2024-01-20T10:30:00Z", "version": "1.0"}}` },
  { name: 'Config', description: 'App configuration', icon: 'fa-cog', category: 'complex', content: `{"app": {"name": "MyApp", "version": "1.0.0"}, "database": {"host": "localhost", "port": 5432}, "security": {"jwtSecret": "your-secret-key"}}` },
  { name: 'Form Schema', description: 'Dynamic form definition', icon: 'fa-wpforms', category: 'complex', content: `{"formId": "contact_form", "title": "Contact Us", "fields": [{"name": "email", "type": "email", "label": "Email", "required": true}], "submit": {"endpoint": "/api/contact", "method": "POST"}}` },
  { name: 'Menu', description: 'Navigation menu', icon: 'fa-bars', category: 'complex', content: `{"id": "main_menu", "items": [{"id": "home", "label": "Home", "icon": "fa-home", "url": "/"}, {"id": "about", "label": "About", "url": "/about"}]}` },
  { name: 'Localization', description: 'i18n translations', icon: 'fa-language', category: 'complex', content: `{"locale": "en", "fallback": "en", "translations": {"common": {"save": "Save", "cancel": "Cancel"}, "errors": {"required": "This field is required"}}}` },
  { name: 'WebSocket', description: 'WebSocket event', icon: 'fa-bolt', category: 'complex', content: `{"event": "user_presence", "type": "broadcast", "payload": {"userId": 1, "status": "online"}, "timestamp": "2024-01-20T14:30:00Z"}` },
  { name: 'Event', description: 'Calendar event', icon: 'fa-calendar', category: 'complex', content: `{"id": 1, "title": "Team Meeting", "start": "2024-01-20T10:00:00Z", "end": "2024-01-20T11:00:00Z", "attendees": [{"userId": 1, "status": "accepted"}], "organizer": {"userId": 1}}` },
  { name: 'Notification', description: 'User notification', icon: 'fa-bell', category: 'complex', content: `{"id": 1, "userId": 1, "type": "mention", "title": "John mentioned you", "message": "Hey @john, check this out", "read": false}` },
  { name: 'Analytics', description: 'Analytics event', icon: 'fa-chart-line', category: 'complex', content: `{"event": "page_view", "userId": 1, "sessionId": "sess_abc", "properties": {"page": "/dashboard", "device": "desktop"}, "timestamp": "2024-01-20T14:30:00Z"}` },
];

@Component({
  selector: 'app-json-templates',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './json-templates.html',
})
export class JsonTemplates {
  readonly templates = TEMPLATES;
  selectedTemplate = signal<JsonTemplate | null>(null);
  activeCategory = signal<'all' | 'simple' | 'common' | 'complex'>('all');

  get filteredTemplates() {
    const cat = this.activeCategory();
    return cat === 'all' ? this.templates : this.templates.filter((t) => t.category === cat);
  }

  setCategory(cat: 'all' | 'simple' | 'common' | 'complex') {
    this.activeCategory.set(cat);
  }

  selectTemplate(template: JsonTemplate) {
    this.selectedTemplate.set(template);
  }

  clearTemplate() {
    this.selectedTemplate.set(null);
  }

  formatJson(content: string): string {
    try {
      return JSON.stringify(JSON.parse(content), null, 2);
    } catch {
      return content;
    }
  }

  getCategoryLabel(cat: string): string {
    switch (cat) {
      case 'simple': return 'Simple';
      case 'common': return 'Common';
      case 'complex': return 'Complex';
      default: return cat;
    }
  }
}