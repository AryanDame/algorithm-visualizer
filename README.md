# 🎨 Algorithm Visualizer

A beautiful, interactive pathfinding algorithm visualizer built with React and Vite. Watch as Dijkstra's algorithm and A\* search through a customizable grid to find the shortest path in real-time.

![Algorithm Visualizer](https://img.shields.io/badge/React-19.2-blue?style=flat-square) ![Vite](https://img.shields.io/badge/Vite-8.0-purple?style=flat-square) ![Node](https://img.shields.io/badge/Node-14+-green?style=flat-square)

---

## ✨ Features

- **🎯 Multiple Pathfinding Algorithms**
  - Dijkstra's Algorithm - Find the shortest path with guaranteed optimality
  - A\* Search - Heuristic-based pathfinding for faster results

- **🎪 Interactive Grid**
  - **Draggable Start & Finish nodes** - Click and drag to reposition endpoints
  - **Draw Walls** - Create obstacles by clicking and dragging on the grid
  - **Weighted Nodes** - Add nodes with higher traversal costs (weight = 15)
  - **Real-time Pathfinding** - See routes update instantly as you move nodes

- **🏗️ Maze Generation**
  - Random maze generation using Recursive Backtracking algorithm
  - Automatically protects start and finish nodes
  - Clears grid cleanly with a single click
  - Fully tested and optimized for reliability

- **⚡ Advanced Features**
  - **Animated Visualizations** - Smooth CSS animations showing visited nodes and shortest paths
  - **Algorithm Comparison** - Switch between Dijkstra and A\* to see performance differences
  - **Clear Grid & Clear Path** - Reset the grid or remove only visualization results
  - **Toggle Drawing Modes** - Easily switch between wall and weight drawing
  - **Tutorial Modal** - Interactive onboarding for new users

- **🧪 Fully Tested**
  - Comprehensive unit tests with Vitest
  - Tests cover all core algorithms and edge cases

---

## 🛠 Tech Stack

### Frontend

- **React 19.2** - UI framework with hooks for state management
- **Vite 8.0** - Lightning-fast build tool and dev server
- **CSS3** - Custom animations and responsive design
- **JavaScript ES6+** - Modern JavaScript with arrow functions and destructuring

### Algorithms

- **Dijkstra's Algorithm** - Classic shortest path with priority queue
- **A\* Search** - Heuristic-based pathfinding with Manhattan distance
- **Recursive Backtracking** - Maze generation algorithm

### Development & Testing

- **Vitest 4.1** - Fast unit test framework
- **ESLint 9** - Code quality and linting

---

## 📦 Installation

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)

### Step-by-Step Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/algorithm-visualizer.git
   cd algorithm-visualizer
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start the Development Server**

   ```bash
   npm run dev
   ```

   The app will open at `http://localhost:5173` (or the next available port).

4. **Build for Production** (Optional)

   ```bash
   npm run build
   ```

   Output will be in the `dist/` folder.

5. **Preview Production Build** (Optional)
   ```bash
   npm run preview
   ```

---

## 🎮 How to Use

### Getting Started

1. **Open the app** - The tutorial modal will appear on first load
2. **Click "Get Started"** to dismiss the tutorial (or click the **?** button anytime to reopen it)

### Drawing Walls

- **Left-click and drag** on the grid to draw walls
- Walls block pathfinding algorithms
- Use the **"Draw Walls"** button to toggle this mode

### Adding Weighted Nodes

- **Click the drawing mode toggle** to switch to **"Draw Weights"**
- Left-click and drag to place weighted nodes (cost = 15)
- Higher weights = slower traversal through that node

### Moving Start & Finish Nodes

- **Click and drag** the green (Start) or red (Finish) nodes to any empty cell
- Cannot place on walls, weights, or each other
- **Real-time pathfinding** updates instantly as you move nodes (if visualization is active)

### Running the Algorithm

1. **Select an algorithm** - Choose between Dijkstra or A\* from the dropdown
2. **Click "Visualize"** - Watch the algorithm find the shortest path
3. The grid will show:
   - **Light blue nodes** = visited during search
   - **Yellow nodes** = shortest path found

### Generating a Maze

- **Click "Generate Maze"** to create a random maze
- The Start and Finish nodes will be protected from walls
- Run any algorithm to find a path through the maze

### Clearing the Grid

- **Clear Grid** - Removes all walls, weights, and path visualizations
- **Clear Path** - Removes only the visualization (keep walls/weights intact)

---

## 📊 Project Structure

```
algorithm-visualizer/
├── src/
│   ├── algorithms/
│   │   ├── dijkstra.js           # Dijkstra's shortest path algorithm
│   │   ├── dijkstra.test.js      # Comprehensive unit tests
│   │   ├── astar.js              # A* pathfinding algorithm
│   │   └── mazeRecursiveBacktracker.js  # Maze generation
│   ├── components/
│   │   ├── Grid.jsx              # Main grid component
│   │   ├── Grid.css              # Grid styling
│   │   ├── Node.jsx              # Individual grid cell
│   │   ├── Node.css              # Node animations and styling
│   │   ├── Navbar.jsx            # Controls and header
│   │   ├── Navbar.css            # Navigation styling
│   │   ├── TutorialModal.jsx     # Tutorial onboarding
│   │   └── TutorialModal.css     # Tutorial styling
│   ├── hooks/
│   │   └── useGridState.jsx      # Custom hook for grid state management
│   ├── App.jsx                   # Main app component
│   ├── App.css                   # Global app styling
│   └── main.jsx                  # Entry point
├── public/                       # Static assets
├── package.json                  # Project dependencies
├── vite.config.js               # Vite configuration
├── eslint.config.js             # ESLint rules
└── README.md                     # This file
```

---

## 🧪 Testing

Run the test suite:

```bash
npm run test
```

**Test Coverage:**

- Algorithm correctness (Dijkstra, A\*)
- Edge cases (walls, unreachable nodes, weights)
- Grid manipulation and state management
- Node adjacency and distance calculations

---

## 🎨 Modern Design Features

The application features a professionally designed, modern interface with:

- **Gradient Backgrounds** - Beautiful purple-to-violet gradient (#667eea → #764ba2) throughout
- **Smooth Animations** - CSS3 transitions and keyframe animations for visual feedback
- **Professional Shadows** - Subtle box-shadows for depth and hierarchy
- **Responsive Buttons** - Interactive button states with hover effects and smooth transitions
- **Color-Coded Nodes** -
  - Green gradient for Start node (#11998e → #38ef7d)
  - Red/Orange gradient for Finish node (#ee0979 → #ff6a00)
  - Dark gradient for Walls (#1a1a1a)
  - Purple radial gradient for Weights
  - Light blue for visited nodes
  - Yellow for shortest path

- **Enhanced Interactivity** - Buttons scale smoothly, dropdowns show visual feedback, help button rotates on hover

---

## 🚀 Performance Tips

- **Large grids** (50x50) work smoothly with memoization
- **Real-time pathfinding** during node dragging is optimized for responsiveness
- **Animations** use CSS transitions for GPU acceleration
- **Memory cleanup** prevents setTimeout leaks during animations

---

## 🎨 Customization

### Change Grid Size

Edit `useGridState.jsx` and modify the grid dimensions:

```javascript
Array.from({ length: 50 }, ...)  // Change 50 to your desired size
```

### Adjust Node Weight

In `useGridState.jsx`, modify the weight value:

```javascript
weight: !node.isWeight ? 15 : 1; // Change 15 to your desired weight
```

### Customize Colors

Edit the CSS files in `src/components/`:

- `.node-visited` - Visited node color
- `.node-shortest-path` - Path animation color
- `.wall` - Wall node color
- `.node-weight` - Weighted node styling

---

## 📚 Algorithm Details

### Dijkstra's Algorithm

- **Time Complexity:** O((V + E) log V) with binary heap
- **Space Complexity:** O(V)
- **Best for:** General shortest path finding, weighted graphs
- **Guarantees:** Always finds the optimal path

### A\* Search

- **Time Complexity:** O((V + E) log V) with heuristic
- **Space Complexity:** O(V)
- **Best for:** Goal-directed pathfinding, fewer node expansions
- **Uses:** Manhattan distance heuristic
- **Note:** Faster than Dijkstra due to heuristic guidance

### Recursive Backtracking Maze

- **Time Complexity:** O(cells)
- **Creates:** Perfect mazes (one solution path)
- **Uses:** Depth-first search with random neighbor selection

---

## 🐛 Known Issues & Future Improvements

### Recently Fixed ✅

- [x] **Maze Generation Bug** (FIXED) - Maze generation now properly resets the grid, clears all animations, and protects start/finish nodes
- [x] **Modern Visual Design** (COMPLETED) - Applied beautiful gradient backgrounds, smooth shadows, and enhanced animations throughout the application
- [x] **Memory Leak Prevention** - All animation timeouts are properly cleaned up to prevent memory leaks

### Future Enhancements

- [ ] Breadth-First Search (BFS) algorithm
- [ ] Bidirectional pathfinding
- [ ] Custom weight input
- [ ] Keyboard shortcuts for faster interaction
- [ ] Export/import grid configurations
- [ ] Dark theme support
- [ ] Mobile responsiveness improvements
- [ ] Additional maze generation algorithms
- [ ] Grid size customization in UI

### Known Limitations

- Grid size is fixed at 50x50 (can be customized in code)
- No undo/redo functionality
- Start/Finish nodes cannot be swapped with a single action

---

## 💡 Tips for Best Experience

1. **Start with the tutorial** - Click the **?** button to review controls anytime
2. **Try different algorithms** - Compare Dijkstra vs A\* on the same maze
3. **Experiment with weights** - Weight nodes differently to test pathfinding
4. **Generate diverse mazes** - Each maze is unique; find patterns in solutions
5. **Move nodes during visualization** - Watch real-time pathfinding in action

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- Inspired by visualization tools like Pathfinding.js
- Algorithm implementations based on classic computer science literature
- Built with ❤️ using React and Vite

---

## 📞 Support

Have questions or found a bug?

- **Open an Issue** - Report bugs or request features on GitHub
- **Discussions** - Share ideas and ask questions in the discussions tab
- **Email** - Contact the maintainers directly

---

## 🎓 Learning Resources

Want to understand the algorithms better?

- [Dijkstra's Algorithm Explained](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm)
- [A\* Pathfinding Article](https://en.wikipedia.org/wiki/A*_search_algorithm)
- [Maze Generation Algorithms](https://en.wikipedia.org/wiki/Maze_generation_algorithm)
- [Interactive Algorithm Visualizations](https://visualgo.net/)

---

**Happy Pathfinding! 🗺️✨**

_Made with React, built with Vite, visualized with passion._
