<script lang="ts">
  import { page } from "$app/stores";
  let { isMobile = false, toggleMenu }: { isMobile?: boolean; toggleMenu: () => void } = $props();

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/news", label: "News" },
    { href: "/events", label: "Events" },
    { href: "/people", label: "People" },
    { href: "/publications", label: "Publications" },
    { href: "/working-papers", label: "Working Papers" },
    { href: "/prizes", label: "Prizes" }
  ];

  function isActive(href: string): boolean {
    if (href === "/") {
      return $page.url.pathname === "/";
    }
    return $page.url.pathname.startsWith(href);
  }

  function handleClick() {
    if (isMobile) {
      toggleMenu();
    }
  }
</script>

<ul class={isMobile ? "py-2 space-y-1" : "hidden md:flex space-x-1"}>
  {#each menuItems as { href, label }}
    <li>
      <a
        href={href}
        class={isMobile
          ? `block py-3 px-4 rounded-md transition-all duration-200 hover:bg-white/10 active:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-serg_purple ${isActive(href) ? 'bg-white/15 font-semibold' : ''}`
          : `px-4 py-2 rounded-md transition-all duration-200 hover:bg-white/10 active:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 ${isActive(href) ? 'bg-white/15 font-semibold' : ''}`}
        onclick={handleClick}
        aria-current={isActive(href) ? "page" : undefined}
      >
        {label}
      </a>
    </li>
  {/each}
</ul>
