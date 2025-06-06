import { useEffect, useState } from "react";
import { Button, Card, Col, Collapse, Form, Row, Badge } from "react-bootstrap";
import { GetGenreList, GetMovieWithFilters } from "../../../API/MovieServiceAPI/MovieServiceAPI";

function FilterMenuComponent({ activeTab, setActiveTab, page, setMovies }) {
  const [sortOption, setSortOption] = useState({ field: null, direction: null });
  const [includeGenres, setIncludeGenres] = useState([]);
  const [excludeGenres, setExcludeGenres] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [excludeKeywords, setExcludeKeywords] = useState([]);
  const [releaseYear, setReleaseYear] = useState("");
  const [includeKeywordInput, setIncludeKeywordInput] = useState("");
  const [excludeKeywordInput, setExcludeKeywordInput] = useState("");
  const [movieGenreList, setMovieGenreList] = useState([]);

  console.log(page);
  

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await GetGenreList();
        setMovieGenreList(res.data);
      } catch {
        alert("Failed to fetch genres");
      }
    };
    fetchGenres();
  }, []);

  const toggleTab = (tabKey) => {
    setActiveTab((prev) => (prev === tabKey ? null : tabKey));
  };

  const toggleSort = (field) => {
    setSortOption((prev) => {
      if (prev.field !== field) return { field, direction: "asc" };
      if (prev.direction === "asc") return { field, direction: "desc" };
      return { field: null, direction: null };
    });
  };

  const toggleSelection = (id, current, setCurrent, opposing, setOpposing) => {
    setCurrent((prev) => (prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]));
    setOpposing((prev) => prev.filter((g) => g !== id));
  };

  const handleAddKeyword = (value, list, setList, clearInput) => {
    const trimmed = value.trim();
    if (trimmed && !list.includes(trimmed)) {
      setList((prev) => [...prev, trimmed]);
      clearInput("");
    }
  };

  const handleRemoveFilter = (type, value) => {
    switch (type) {
      case "sort":
        setSortOption({ field: null, direction: null });
        break;
      case "includeGenre":
        setIncludeGenres((prev) => prev.filter((g) => g !== value));
        break;
      case "excludeGenre":
        setExcludeGenres((prev) => prev.filter((g) => g !== value));
        break;
      case "includeKeyword":
        setKeywords((prev) => prev.filter((k) => k !== value));
        break;
      case "excludeKeyword":
        setExcludeKeywords((prev) => prev.filter((k) => k !== value));
        break;
      case "releaseYear":
        setReleaseYear("");
        break;
      default:
        break;
    }
  };

  const handleApplyFilters = async () => {

    try {
      const response = await GetMovieWithFilters(
        page,
        sortOption,
        includeGenres,
        releaseYear,
        excludeGenres,
        excludeKeywords,
        
      );


      if(response.length >= 1){
        setMovies(response)
      }
      
    } catch (error) {
      alert(`Something went wrong: \n ${error}`)
    }
  };

  const clearFilters = () => {
    setSortOption({ field: null, direction: null });
    setIncludeGenres([]);
    setExcludeGenres([]);
    setKeywords([]);
    setExcludeKeywords([]);
    setReleaseYear("");
    setIncludeKeywordInput("");
    setExcludeKeywordInput("");
  };

  const getArrow = (field) => {
    if (sortOption.field !== field) return "";
    return sortOption.direction === "asc" ? "🔼" : "🔽";
  };

  const labelMap = {
    popularity: "Popularity",
    release_date: "Release Date",
    title: "Title",
    revenue: "Box Office",
    vote_average: "Movie Score",
  };

  const getGenreName = (id) => movieGenreList.find((g) => g.id === id)?.name || `Genre ${id}`;

  const activeFilters = [
    ...(sortOption.field
      ? [{ type: "sort", label: `Sort: ${labelMap[sortOption.field]} (${sortOption.direction})`, value: null }]
      : []),
    ...includeGenres?.map((id) => ({
      type: "includeGenre",
      label: `Include Genre: ${getGenreName(id)}`,
      value: id,
    })),
    ...excludeGenres?.map((id) => ({
      type: "excludeGenre",
      label: `Exclude Genre: ${getGenreName(id)}`,
      value: id,
    })),
    ...keywords?.map((k) => ({
      type: "includeKeyword",
      label: `Include Keyword: ${k}`,
      value: k,
    })),
    ...excludeKeywords?.map((k) => ({
      type: "excludeKeyword",
      label: `Exclude Keyword: ${k}`,
      value: k,
    })),
    ...(releaseYear ? [{ type: "releaseYear", label: `Release Year: ${releaseYear}`, value: releaseYear }] : []),
  ];

  return (
    <Row>
      <Col>
        <Card>
          <Col className="mt-0 p-0" style={{ backgroundColor: "orange", borderRadius: "2%" }}>
            <h5 className="mt-2">Discover Movies</h5>
            <h6>Active Filters</h6>
            <div className="mb-3 d-flex flex-wrap" style={{ gap: "8px", rowGap: "8px" }}>
              {activeFilters.length === 0 ? (
                <p className="text-muted">No filters applied.</p>
              ) : (
                activeFilters?.map((f, i) => (
                  <Badge
                    key={i}
                    bg="secondary"
                    pill
                    className="d-flex align-items-center"
                    style={{ cursor: "default", gap: "px" }}
                  >
                    <span>{f.label}</span>
                    <Button
                      variant="link"
                      size="sm"
                      onClick={() => handleRemoveFilter(f.type, f.value)}
                      style={{
                        color: "white",
                        padding: "0 6px",
                        fontWeight: "bold",
                        lineHeight: "1",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      &times;
                    </Button>
                  </Badge>
                ))
              )}
            </div>
          </Col>
          <Card.Body style={{ backgroundColor: "#fde5d0" }}>
            <Button
              variant="outline-primary"
              onClick={() => toggleTab("sort")}
              className="w-100 text-start mb-2"
            >
              Sort Options {activeTab === "sort" ? "▲" : "▼"}
            </Button>
            <Collapse in={activeTab === "sort"}>
              <div className="pt-2">
                <Form className="d-grid gap-2">
                  {Object.keys(labelMap)?.map((field) => (
                    <Button
                      key={field}
                      variant={sortOption.field === field ? "primary" : "outline-secondary"}
                      onClick={() => toggleSort(field)}
                      className="d-flex justify-content-between align-items-center"
                    >
                      <span>{labelMap[field]}</span>
                      <span>{getArrow(field)}</span>
                    </Button>
                  ))}
                </Form>
              </div>
            </Collapse>

            <Button
              variant="outline-primary"
              onClick={() => toggleTab("include-genres")}
              className="w-100 text-start mt-2"
            >
              Include Genres {activeTab === "include-genres" ? "▲" : "▼"}
            </Button>
            <Collapse in={activeTab === "include-genres"}>
              <div className="p-2">
                <Form>
                  {movieGenreList?.map((genre) => (
                    <Form.Check
                      key={genre.id}
                      type="checkbox"
                      label={genre.name}
                      checked={includeGenres.includes(genre.id)}
                      onChange={() =>
                        toggleSelection(genre.id, includeGenres, setIncludeGenres, excludeGenres, setExcludeGenres)
                      }
                    />
                  ))}
                </Form>
              </div>
            </Collapse>

        
            <Form.Group className="mt-3">
              <Form.Label>Release Year:</Form.Label>
              <Form.Control
                type="number"
                placeholder="e.g. 2023"
                value={releaseYear}
                onChange={(e) => setReleaseYear(e.target.value)}
              />
            </Form.Group>

            <Button
              variant="outline-danger"
              onClick={() => toggleTab("exclude-genres")}
              className="w-100 text-start mt-2"
            >
              Exclude Genres & Keywords {activeTab === "exclude-genres" ? "▲" : "▼"}
            </Button>
            <Collapse in={activeTab === "exclude-genres"}>
              <div className="p-2">
                <Form>
                  {movieGenreList?.map((genre) => (
                    <Form.Check
                      key={genre.id}
                      type="checkbox"
                      label={genre.name}
                      checked={excludeGenres.includes(genre.id)}
                      onChange={() =>
                        toggleSelection(genre.id, excludeGenres, setExcludeGenres, includeGenres, setIncludeGenres)
                      }
                    />
                  ))}
                </Form>
              </div>
            </Collapse>

            <Row className="mt-4">
              <Col>
                <Button variant="success" className="w-100" onClick={handleApplyFilters}>
                  Apply Filters
                </Button>
              </Col>
              <Col>
                <Button variant="outline-secondary" className="w-100" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default FilterMenuComponent;
