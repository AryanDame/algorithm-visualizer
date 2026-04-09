import React, { useMemo, useState } from "react";
import "./LearningPage.css";

const algorithmLessons = [
  {
    id: "dijkstra",
    name: "Dijkstra",
    category: "Weighted shortest path",
    coreIdea:
      "Expands the frontier in order of smallest known distance from the start node. It is optimal when all edge weights are non-negative.",
    pseudocode: [
      "dist[start] = 0, all others = Infinity",
      "Push start into min-priority queue",
      "Pop smallest-distance node u",
      "Relax every neighbor v of u",
      "If new distance is smaller, update dist[v] and predecessor[v]",
    ],
    complexity: {
      time: "O((V + E) log V) with binary heap",
      space: "O(V)",
    },
    guarantees: "Complete and optimal with non-negative weights.",
    pitfalls: [
      "Incorrect on graphs with negative edges.",
      "Can explore too widely when the goal is far and no heuristic is used.",
    ],
    internetRelevance: [
      "Used in link-state routing protocols (OSPF/IS-IS).",
      "Common baseline in map and logistics routing before heuristic acceleration.",
    ],
    references: ["https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm"],
  },
  {
    id: "astar",
    name: "A* Search",
    category: "Heuristic shortest path",
    coreIdea:
      "Chooses node with minimal f(n) = g(n) + h(n), where g is known cost and h is estimated remaining cost. With an admissible heuristic, it finds an optimal path.",
    pseudocode: [
      "Initialize open set with start",
      "Track gScore and fScore for each node",
      "Pop node with lowest fScore",
      "Relax neighbors and update predecessor when better path found",
      "Stop when goal is popped from open set",
    ],
    complexity: {
      time: "Worst-case similar to Dijkstra; often much faster in practice",
      space: "High; stores open and closed state",
    },
    guarantees:
      "Optimal with admissible heuristic; strongest behavior with consistent heuristic.",
    pitfalls: [
      "Poor heuristic can degrade to Dijkstra-like exploration.",
      "Inconsistent heuristics may cause node re-expansions.",
    ],
    internetRelevance: [
      "Widely used in games, robotics, and navigation systems.",
      "Core idea behind many modern route-planning speedups and variants.",
    ],
    references: ["https://en.wikipedia.org/wiki/A*_search_algorithm"],
  },
  {
    id: "weighted-astar",
    name: "Weighted A*",
    category: "Bounded-suboptimal heuristic search",
    coreIdea:
      "Uses f(n) = g(n) + w*h(n) with weight w > 1 to bias search harder toward the goal. This often reduces explored nodes at the cost of path optimality.",
    pseudocode: [
      "Choose heuristic multiplier w > 1",
      "Initialize open set with start and weighted fScore",
      "Expand node with smallest weighted fScore",
      "Relax neighbors with normal g updates",
      "Stop at goal, accepting speed-over-optimality trade-off",
    ],
    complexity: {
      time: "Typically lower expansions than A* with good heuristics",
      space: "Similar memory profile to A*",
    },
    guarantees:
      "Complete on finite graphs with positive costs; not guaranteed optimal for w > 1.",
    pitfalls: [
      "Can lock into apparently good routes that become expensive later.",
      "Large weights can significantly reduce solution quality.",
    ],
    internetRelevance: [
      "Used in real-time routing/planning where responsiveness matters more than perfect optimality.",
      "Common in game AI and robotics when strict latency budgets exist.",
    ],
    references: ["https://en.wikipedia.org/wiki/A*_search_algorithm"],
  },
  {
    id: "uniform-cost",
    name: "Uniform Cost Search",
    category: "Cost-optimal weighted search",
    coreIdea:
      "Always expands the node with the lowest accumulated path cost from the start. In grid pathfinding with non-negative weights, it is equivalent in guarantee to Dijkstra.",
    pseudocode: [
      "Set cost(start) = 0 and all others to Infinity",
      "Push start into a priority frontier by cost",
      "Pop node with smallest cost-so-far",
      "Relax neighbors with edge/node weights",
      "Stop when goal is popped from frontier",
    ],
    complexity: {
      time: "O((V + E) log V) with a priority queue",
      space: "O(V)",
    },
    guarantees: "Complete and optimal for non-negative edge costs.",
    pitfalls: [
      "Can be slower than heuristic methods when the goal is far away.",
      "Priority queue quality heavily affects runtime performance.",
    ],
    internetRelevance: [
      "Used as a robust baseline in route engines and weighted graph analysis.",
      "Important for systems where guaranteed least-cost routing is required.",
    ],
    references: ["https://en.wikipedia.org/wiki/Uniform-cost_search"],
  },
  {
    id: "bfs",
    name: "Breadth-First Search",
    category: "Unweighted shortest path",
    coreIdea:
      "Explores neighbors level by level using a FIFO queue. In unweighted graphs, first arrival gives shortest path by edge count.",
    pseudocode: [
      "Mark start visited and enqueue",
      "Dequeue node u",
      "For each unvisited neighbor v: mark visited, set parent, enqueue",
      "Stop when goal is dequeued or queue is empty",
    ],
    complexity: {
      time: "O(V + E)",
      space: "O(V)",
    },
    guarantees: "Complete and optimal only for equal-cost edges.",
    pitfalls: [
      "Cannot model weighted terrain correctly.",
      "Memory usage grows quickly on large branching graphs.",
    ],
    internetRelevance: [
      "Used in web crawling and social graph layer exploration.",
      "Used in unweighted network reachability and shortest-hop analysis.",
    ],
    references: ["https://en.wikipedia.org/wiki/Breadth-first_search"],
  },
  {
    id: "dfs",
    name: "Depth-First Search",
    category: "Traversal and exploration",
    coreIdea:
      "Follows one branch deeply before backtracking. Good for structural exploration, not shortest paths.",
    pseudocode: [
      "Push start node onto stack (or recurse)",
      "Pop current node and mark visited",
      "Push unvisited neighbors",
      "Backtrack when branch is exhausted",
    ],
    complexity: {
      time: "O(V + E)",
      space: "O(V) worst case, often O(depth) in tree search",
    },
    guarantees: "Not optimal for shortest path problems.",
    pitfalls: [
      "Can wander deep into unhelpful branches.",
      "On implicit infinite graphs, plain DFS may not terminate.",
    ],
    internetRelevance: [
      "Foundation for topological sorting, SCC detection, and graph analysis.",
      "Appears in maze generation, dependency analysis, and compiler tooling.",
    ],
    references: ["https://en.wikipedia.org/wiki/Depth-first_search"],
  },
  {
    id: "greedy",
    name: "Greedy Best-First",
    category: "Heuristic-only search",
    coreIdea:
      "Always expands node estimated closest to goal, ignoring accumulated travel cost.",
    pseudocode: [
      "Push start with priority h(start)",
      "Pop node with smallest heuristic value",
      "Expand neighbors and push by heuristic",
      "Stop when goal is reached",
    ],
    complexity: {
      time: "Depends heavily on heuristic quality and map structure",
      space: "Can still grow large on misleading maps",
    },
    guarantees: "No shortest-path guarantee.",
    pitfalls: [
      "Can take costly detours when heuristic is deceptive.",
      "May appear fast visually but produce poor final path quality.",
    ],
    internetRelevance: [
      "Useful in real-time systems where response speed is prioritized over exact optimality.",
      "Common stepping stone to understand heuristic search before A*.",
    ],
    references: ["https://en.wikipedia.org/wiki/Best-first_search"],
  },
  {
    id: "beam-search",
    name: "Beam Search",
    category: "Width-limited heuristic search",
    coreIdea:
      "Expands only the top-k promising frontier nodes at each layer (beam width), pruning the rest to keep search focused and fast.",
    pseudocode: [
      "Initialize frontier with start",
      "Generate next candidates from current frontier",
      "Rank candidates by heuristic quality",
      "Keep only top-k nodes (beam width)",
      "Repeat until goal found or frontier exhausted",
    ],
    complexity: {
      time: "Lower than exhaustive best-first in many maps",
      space: "Bounded by beam width times depth",
    },
    guarantees: "No completeness/optimality guarantee with narrow beams.",
    pitfalls: [
      "Can prune away the only viable route early.",
      "Very sensitive to beam width and heuristic quality.",
    ],
    internetRelevance: [
      "Core decoding strategy in NLP and sequence generation.",
      "Applied where controlled compute budgets are more important than exhaustive search.",
    ],
    references: ["https://en.wikipedia.org/wiki/Beam_search"],
  },
  {
    id: "bidirectional-bfs",
    name: "Bidirectional BFS",
    category: "Two-frontier unweighted search",
    coreIdea:
      "Runs BFS from start and goal simultaneously and stops when frontiers meet.",
    pseudocode: [
      "Initialize forward and backward queues",
      "Expand one layer from each side",
      "Track visited sets and parent links for both directions",
      "Stop when a node appears in both visited sets",
      "Reconstruct path by stitching the two trees",
    ],
    complexity: {
      time: "Often much less than one-direction BFS in practice",
      space: "Still O(V) worst case",
    },
    guarantees: "Shortest path by edge count on unweighted graphs.",
    pitfalls: [
      "Needs careful stop condition to avoid premature termination in weighted variants.",
      "Requires reverse expansion support for directed graphs.",
    ],
    internetRelevance: [
      "Used in large-scale point-to-point routing and puzzle search.",
      "Key concept in modern shortest-path speedup pipelines.",
    ],
    references: ["https://en.wikipedia.org/wiki/Bidirectional_search"],
  },
  {
    id: "bidirectional-dijkstra",
    name: "Bidirectional Dijkstra",
    category: "Two-frontier weighted shortest path",
    coreIdea:
      "Runs Dijkstra simultaneously from start and goal over weighted graphs, meeting in the middle to reduce explored area for point-to-point routing.",
    pseudocode: [
      "Initialize forward and backward priority frontiers",
      "Expand side with smaller frontier minimum distance",
      "Relax weighted edges in both directions",
      "Track best meeting cost found so far",
      "Stop when no frontier pair can beat current best cost",
    ],
    complexity: {
      time: "Same asymptotic class as Dijkstra but often fewer expansions",
      space: "Two frontier structures and two parent maps",
    },
    guarantees:
      "Optimal shortest path with correct stopping condition and non-negative weights.",
    pitfalls: [
      "Incorrect early-stop logic can produce wrong routes.",
      "Implementation is more subtle than one-direction Dijkstra.",
    ],
    internetRelevance: [
      "Used in practical road-network and navigation backends for faster single-pair queries.",
      "Acts as a building block for advanced routing accelerators.",
    ],
    references: ["https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm"],
  },
  {
    id: "bidirectional-greedy",
    name: "Bidirectional Greedy Search",
    category: "Two-frontier heuristic search",
    coreIdea:
      "Runs greedy best-first from both start and goal sides, using heuristics to push each frontier toward the other until they meet.",
    pseudocode: [
      "Initialize start and finish heuristic frontiers",
      "Expand a best-looking node from the forward side",
      "Expand a best-looking node from the backward side",
      "Track parent links on both sides",
      "Stop when frontiers intersect and stitch the path",
    ],
    complexity: {
      time: "Often lower expansions than one-way greedy in open maps",
      space: "Two frontier structures plus parent maps",
    },
    guarantees: "Not guaranteed optimal; practical speed-focused strategy.",
    pitfalls: [
      "Can miss lower-cost routes due to heuristic bias.",
      "Frontier meeting quality depends strongly on map geometry.",
    ],
    internetRelevance: [
      "Useful for interactive visual systems that value fast route discovery.",
      "Demonstrates practical trade-offs between accuracy and responsiveness.",
    ],
    references: ["https://en.wikipedia.org/wiki/Bidirectional_search"],
  },
  {
    id: "bellman-ford",
    name: "Bellman-Ford",
    category: "Negative-weight shortest path",
    coreIdea:
      "Relaxes all edges repeatedly for V-1 rounds and performs one extra pass to detect reachable negative cycles.",
    pseudocode: [
      "Initialize dist[start] = 0, others = Infinity",
      "Repeat V-1 times: relax every edge (u, v)",
      "If any edge still relaxes on pass V, negative cycle exists",
      "Use predecessor chain to reconstruct shortest path when valid",
    ],
    complexity: {
      time: "O(V * E)",
      space: "O(V)",
    },
    guarantees: "Works with negative edges; detects reachable negative cycles.",
    pitfalls: [
      "Much slower than Dijkstra/A* on large non-negative maps.",
      "Negative cycle means no well-defined shortest path.",
    ],
    internetRelevance: [
      "Used in distance-vector routing families and robustness analysis.",
      "Important in finance/network models where negative edges are meaningful.",
    ],
    references: [
      "https://en.wikipedia.org/wiki/Bellman%E2%80%93Ford_algorithm",
    ],
  },
  {
    id: "iddfs",
    name: "Iterative Deepening DFS",
    category: "Depth-limited repeated search",
    coreIdea:
      "Runs DFS with depth limit 0,1,2,... until goal is found. It combines BFS-like solution depth guarantees with DFS memory behavior.",
    pseudocode: [
      "For depth = 0 to max:",
      "Run depth-limited DFS(start, depth)",
      "If goal found, stop and return path",
      "Else deepen and repeat",
    ],
    complexity: {
      time: "O(b^d) with repeated upper-level expansions",
      space: "O(d)",
    },
    guarantees:
      "Complete for finite branching and shallowest-solution optimality in unweighted settings.",
    pitfalls: [
      "Re-expands upper levels repeatedly.",
      "Can still be expensive if branching factor is high and solution is deep.",
    ],
    internetRelevance: [
      "Classic strategy in game trees and memory-constrained search.",
      "Useful for interactive systems that need progressively deeper answers.",
    ],
    references: [
      "https://en.wikipedia.org/wiki/Iterative_deepening_depth-first_search",
    ],
  },
];

function LearningPage() {
  const [activeId, setActiveId] = useState("dijkstra");

  const activeLesson = useMemo(
    () =>
      algorithmLessons.find((lesson) => lesson.id === activeId) ??
      algorithmLessons[0],
    [activeId],
  );

  return (
    <section className="learning-page">
      <div className="learning-hero">
        <h2>Algorithm Learning Studio</h2>
        <p>
          Open one algorithm at a time to get a dedicated learning page with
          intuition, complexity, guarantees, pitfalls, and practical
          internet-scale relevance.
        </p>
      </div>

      <div className="learning-layout">
        <aside className="learning-sidebar" aria-label="Algorithm topics">
          {algorithmLessons.map((lesson) => (
            <button
              key={lesson.id}
              className={`lesson-nav ${lesson.id === activeId ? "active" : ""}`}
              type="button"
              onClick={() => setActiveId(lesson.id)}
            >
              <span className="lesson-nav-name">{lesson.name}</span>
              <span className="lesson-nav-tag">{lesson.category}</span>
            </button>
          ))}
        </aside>

        <article className="lesson-detail" aria-live="polite">
          <header className="lesson-detail-header">
            <h3>{activeLesson.name}</h3>
            <p>{activeLesson.coreIdea}</p>
          </header>

          <section className="lesson-section">
            <h4>Pseudocode Flow</h4>
            <ol>
              {activeLesson.pseudocode.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>

          <section className="lesson-section two-col">
            <div>
              <h4>Complexity</h4>
              <p>
                <strong>Time:</strong> {activeLesson.complexity.time}
              </p>
              <p>
                <strong>Space:</strong> {activeLesson.complexity.space}
              </p>
            </div>
            <div>
              <h4>Guarantees</h4>
              <p>{activeLesson.guarantees}</p>
            </div>
          </section>

          <section className="lesson-section">
            <h4>Common Pitfalls</h4>
            <ul>
              {activeLesson.pitfalls.map((pitfall) => (
                <li key={pitfall}>{pitfall}</li>
              ))}
            </ul>
          </section>

          <section className="lesson-section">
            <h4>Real-World Internet Relevance</h4>
            <ul>
              {activeLesson.internetRelevance.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </section>

          <section className="lesson-section">
            <h4>Sources</h4>
            <ul className="source-list">
              {activeLesson.references.map((ref) => (
                <li key={ref}>
                  <a href={ref} target="_blank" rel="noreferrer">
                    {ref}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </div>
    </section>
  );
}

export default LearningPage;
